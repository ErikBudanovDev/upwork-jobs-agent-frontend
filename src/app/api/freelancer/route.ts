import connectDb from '@/lib/db'
import Freelancer, { IFreelancer } from '@/models/freelancer.model'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
	try {
		const freelancerId = req.nextUrl.searchParams.get('freelancerId')
		await connectDb()
		const response = await Freelancer.findById(freelancerId)
		return NextResponse.json(response)
	} catch (e) {
		console.log(e)
	}
	return NextResponse.json({ message: 'Error' }, { status: 500 })
}

export async function PUT(req: NextRequest) {
	try {
		const data: IFreelancer = await req.json()
		const updatedFreelancer = await Freelancer.findByIdAndUpdate(data._id, data)

		return NextResponse.json(updatedFreelancer)
	} catch (e) {
		console.log(e)
	}
	return NextResponse.json({ message: 'Error' }, { status: 500 })
}
