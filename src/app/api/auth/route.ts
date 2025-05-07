import connectDb from '@/lib/db'
import { adminAuth } from '@/lib/firebase-admin'
import User from '@/models/user.model'
import { serialize } from 'cookie'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
	const token = req.cookies.get('session')
	const onlyToken = req.nextUrl.searchParams.get('onlyToken')

	if (token) {
		if (onlyToken === 'true') {
			return NextResponse.json({ token: token.value })
		}
		connectDb()
		const firebaseUser = await adminAuth.verifyIdToken(token.value)
		const user = await User.findOne({ uid: firebaseUser.uid }).select(
			'-password'
		)
		if (user) {
			return NextResponse.json(user)
		}
	}

	return NextResponse.json({ message: 'User not found' }, { status: 404 })
}

export async function POST(req: NextRequest) {
	const { token } = await req.json()
	try {
		connectDb()
		const serialized = serialize('session', token, {
			httpOnly: true,
			secure: true,
			sameSite: 'strict',
			maxAge: 60 * 60 * 24 * 7,
			path: '/',
		})

		const decoded = await adminAuth.verifyIdToken(token)
		const { uid } = decoded
		const firebaseUser = await adminAuth.getUser(uid)
		const existedUser = await User.findOne({ uid })
		const response = NextResponse.json({ message: 'Authenticated' })
		if (!existedUser) {
			await User.create({
				uid,
				username: firebaseUser.displayName ?? firebaseUser.email,
				password: firebaseUser.passwordHash || 'testing',
				email: firebaseUser.email,
			})
		}
		response.headers.set('Set-Cookie', serialized)
		return response
	} catch (e) {
		console.log(e)
	}
	return NextResponse.json({ error: 'User not found' }, { status: 404 })
}
