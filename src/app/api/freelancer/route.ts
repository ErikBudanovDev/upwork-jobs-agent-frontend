import connectDb from '@/lib/db'
import Freelancer, {
	FreelancerType,
	IFreelancer,
} from '@/models/freelancer.model'
import { CustomErrors } from '@/validators/CreateFreelancerValidator'
import mongoose from 'mongoose'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
	try {
		const freelancerId = req.nextUrl.searchParams.get('freelancerId')
		await connectDb()

		if (freelancerId) {
			const response = await Freelancer.findById(freelancerId)
			return NextResponse.json(response)
		}

		return NextResponse.json(await Freelancer.find())
	} catch (e) {
		console.log(e)
	}
	return NextResponse.json({ message: 'Error' }, { status: 500 })
}

export async function PUT(req: NextRequest) {
	try {
		const data: IFreelancer = await req.json()
		const updatedFreelancer = await Freelancer.findByIdAndUpdate(
			new mongoose.Types.ObjectId(data._id as mongoose.Types.ObjectId),
			data,
			{ new: true }
		)
		return NextResponse.json(updatedFreelancer)
	} catch (e) {
		console.log(e)
	}
	return NextResponse.json({ message: 'Error' }, { status: 500 })
}

export async function DELETE(req: NextRequest) {
	const { freelancer } = await req.json()
	const response = await Freelancer.findByIdAndDelete(freelancer)
	return NextResponse.json(response)
}

export async function POST(req: NextRequest) {
	const { data: freelancer }: { data: FreelancerType } = await req.json()
	try {
		await connectDb()
		validateFreelancer(freelancer)
		const newFreelancer = await Freelancer.create(freelancer)

		return NextResponse.json({ newFreelancer }, { status: 201 })
	} catch (e) {
		if (e instanceof mongoose.Error.ValidationError) {
			return NextResponse.json({ message: 'Validation error' }, { status: 400 })
		}
		if (e instanceof CustomErrors) {
			return NextResponse.json(e, { status: 400 })
		}
		console.log(e)
	}
	return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
}

const validateFreelancer = (freelancer: FreelancerType) => {
	const errors = []
	if (!freelancer.username) {
		errors.push({ field: 'username', message: 'Username is required' })
	}
	if (!freelancer.email) {
		errors.push({ field: 'email', message: 'Email is required' })
	}
	if (!freelancer.job_preferences) {
		errors.push({
			field: 'job_preferences',
			message: 'Job preferences is required',
		})
	}
	if (!freelancer.profile_description) {
		errors.push({
			field: 'profile_description',
			message: 'Profile description is required',
		})
	}
	if (
		Object.entries(freelancer.search_criteries).length <= 1 &&
		freelancer.search_criteries[0].trim() === ''
	) {
		errors.push({
			field: 'search_criteries',
			message: 'Search criteries is required',
		})
	}
	if (
		Object.entries(freelancer.preferred_locations).length <= 1 &&
		freelancer.preferred_locations[0].trim() === ''
	) {
		errors.push({
			field: 'preferred_locations',
			message: 'preferred locations is required',
		})
	}
	if (errors.length) throw new CustomErrors('ValidationError', errors)
}
