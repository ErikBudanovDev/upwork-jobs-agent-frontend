import connectDb from '@/lib/db'
import Agency from '@/models/agency.model'
import User from '@/models/user.model'
import authService from '@/services/AuthService'
import { IAgency } from '@/types/agency.type'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
	connectDb()
	const data: IAgency = await req.json()
	const agency = await Agency.create({
		name: data.name,
	})
	const currentUser = await authService.getCurrentUser(req)
	if (currentUser && agency) {
		await User.updateOne({ uid: currentUser.uid }, { agencyId: agency._id })
	}
	return NextResponse.json({ agency })
}

export async function GET(req: NextRequest) {
	const id = new URL(req.url).searchParams.get('id')
	if (id) {
		const agency = await Agency.findById(id)
		if (agency) {
			return NextResponse.json(agency)
		}
	}
	const currentUser = await authService.getCurrentUser(req)
	if (currentUser && currentUser.agencyId) {
		const agency = await Agency.findById(currentUser.agencyId)
		if (agency) {
			return NextResponse.json(agency)
		}
	}

	return NextResponse.json({ error: 'Agency not found' }, { status: 404 })
}
