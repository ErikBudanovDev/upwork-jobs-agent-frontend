import User from '@/models/user.model'
import authService from '@/services/AuthService'
import { NextRequest, NextResponse } from 'next/server'

export async function PUT(req: NextRequest) {
	const firebaseUser = await authService.getCurrentUser(req)
	const { emailNotifications } = await req.json()
	if (firebaseUser) {
		const user = await User.findOne({ uid: firebaseUser.uid })
		if (user) {
			const updatedUser = await User.findOneAndUpdate(
				{ _id: user._id },
				{ emailNotifications },
				{ new: true }
			)
			return NextResponse.json(updatedUser, { status: 200 })
		}
	}

	return NextResponse.json({ message: 'User not found' }, { status: 404 })
}
