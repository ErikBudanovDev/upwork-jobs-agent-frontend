import Invite from '@/models/invite.model'
import User from '@/models/user.model'
import authService from '@/services/AuthService'
import { InviteAnswer } from '@/types/invite.type'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
	const { to } = await req.json()
	const user = await authService.getCurrentUser(req)
	if (to && user && user.agencyId) {
		const invite = await Invite.create({
			to,
			from: user.email,
		})

		return NextResponse.json(invite, { status: 201 })
	}
	return NextResponse.json({ error: 'Bad request' }, { status: 404 })
}

export async function GET(req: NextRequest) {
	const currentUser = await authService.getCurrentUser(req)
	if (currentUser) {
		const invites = await Invite.find({ to: currentUser.email })
		return NextResponse.json(invites)
	}
	return NextResponse.json({ error: 'Bad request' }, { status: 404 })
}

export async function PUT(req: NextRequest) {
	const currentUser = await authService.getCurrentUser(req)
	if (currentUser) {
		const { id, answer }: InviteAnswer = await req.json()
		const invite = await Invite.findById(id)
		if (invite) {
			const inviteUser = await User.findOne({ email: invite.from })
			if (answer && inviteUser) {
				await User.findOneAndUpdate(
					{ uid: currentUser.uid },
					{ agencyId: inviteUser.agencyId }
				)
			}
			// await Invite.deleteOne({ _id: objectId })
		}
		return NextResponse.json({ message: 'Invite deleted successfully' })
	}
	return NextResponse.json({ error: 'Bad request' }, { status: 404 })
}
