import connectDb from '@/lib/db'
import { IFreelancer } from '@/models/freelancer.model'
import Job from '@/models/job.model'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
	try {
		const { freelancers }: { freelancers: IFreelancer[] } = await req.json()
		await connectDb()
		const jobs: Record<string, object[]> = {}
		for (const freelancer of freelancers) {
			const job = await Job.find({ freelancer_id: freelancer._id })
			if (job) jobs[freelancer._id as string] = job
		}
		return NextResponse.json(jobs)
	} catch (e) {
		console.log(e)
	}
	return NextResponse.json([])
}
