import User from '@/models/user.model'
import agencyService from '@/services/AgencyService'
import mongoose from 'mongoose'
import { NextRequest, NextResponse } from 'next/server'
//eslint-disable-next-line
export async function GET(req: NextRequest) {
	const agency = await agencyService.getMineAgency(req)
	if (agency) {
		const members = await User.find({
			agencyId: new mongoose.Types.ObjectId(agency._id),
		})

		return NextResponse.json(members)
	}
	return NextResponse.json([])
}
