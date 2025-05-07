import User from '@/models/user.model'
import authService from '@/services/AuthService'
import { NextRequest, NextResponse } from 'next/server'

export async function PUT(req: NextRequest) {
	const user = await authService.getCurrentUser(req)
	if (user) {
		const { emailNotifications } = await req.json()
		console.log()
		if (user.emailNotifications !== emailNotifications) {
			const updatedUser = await User.findOneAndUpdate(
				{ uid: user.uid },
				{ emailNotifications },
				{ new: true }
			)
			return NextResponse.json(updatedUser)
		}
		return NextResponse.json({ message: 'User updated' })
	}

	return NextResponse.json({ message: 'User not found' }, { status: 404 })
}
