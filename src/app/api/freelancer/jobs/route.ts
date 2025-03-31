import { AgencyFreelancer } from '@/lib/agency'
import connectDb from '@/lib/db'
import Job from '@/models/job.model'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
	try {
		const { freelancers }: { freelancers: AgencyFreelancer[] } =
			await req.json()
		await connectDb()
		const jobs: Record<string, object[]> = {}
		for (const freelancer of freelancers) {
			const job = await Job.find({ freelancer_id: freelancer.id })
			if(job)jobs[freelancer.id] = job
		}
		return NextResponse.json(jobs)
	} catch (e) {
		console.log(e)
	}
	return NextResponse.json([])
}
