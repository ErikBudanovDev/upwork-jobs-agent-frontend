import authService from '@/services/AuthService'
import { NextRequest, NextResponse } from 'next/server'

export async function authMiddleware(req: NextRequest) {
	const token = req.cookies.get('session') || ''
	const isAuth = /auth/.test(req.nextUrl.pathname)
	const user = await authService.getCurrentUser(req)

	if (!isAuth && !user) {
		return NextResponse.redirect(new URL('/auth/login', req.url))
	} else if (token && isAuth) {
		const user = await authService.getCurrentUser(req)
		if (user) {
			return NextResponse.redirect(new URL('/agency/new', req.url))
		}
	}

	return NextResponse.next()
}
