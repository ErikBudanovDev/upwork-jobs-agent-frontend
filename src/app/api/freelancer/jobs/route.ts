import connectDb from '@/lib/db'
import Freelancer from '@/models/freelancer.model'
import Job from '@/models/job.model'
import mongoose from 'mongoose'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
	try {
		const { freelancerId } = (await req.json()) as { freelancerId: string }
		await connectDb()
		if (!mongoose.Types.ObjectId.isValid(freelancerId)) {
			return NextResponse.json([])
		}
		if (!(await Freelancer.findById(freelancerId))) return NextResponse.json([])
		const jobs = await Job.find({
			freelancer_id: freelancerId,
		})
		return NextResponse.json(jobs)
	} catch (e) {
		console.log(e)
	}
	return NextResponse.json([])
}
