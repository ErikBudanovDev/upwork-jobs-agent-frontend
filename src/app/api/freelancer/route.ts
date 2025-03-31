import connectDb from '@/lib/db'
import Freelancer, {
	FreelancerType,
	IFreelancer,
} from '@/models/freelancer.model'
import mongoose from 'mongoose'
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

export async function DELETE(req: NextRequest) {
	const data = await req.json()
	console.log(data)
	return NextResponse.json([])
}

export async function POST(req: NextRequest) {
	const { data: freelancer }: { data: FreelancerType } = await req.json()
	try {
		await connectDb()
		const newFreelancer = await Freelancer.create(freelancer)

		return NextResponse.json({ newFreelancer }, { status: 201 })
	} catch (e) {
		if (e instanceof mongoose.Error.ValidationError) {
			return NextResponse.json({ error: 'Validation error' }, { status: 400 })
		}
		console.log(e)
	}
	return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
}
