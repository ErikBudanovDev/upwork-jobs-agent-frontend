import { API_LINKS, SERVER_CONFIG } from '@/lib/globals'
import { NextRequest, NextResponse } from 'next/server'

async function getCurrentUser(req: NextRequest) {
	try {
		const token = req.cookies.get('session')
		if (token) {
			const response = await fetch(`${SERVER_CONFIG.server}${API_LINKS.auth}`, {
				headers: {
					Cookie: `session=${token.value}`,
				},
			})
			if (response.ok) {
				return await response.json()
			}
		}
	} catch (e) {
		console.log('Auth error:', e)
	}
	return null
}

export async function authMiddleware(req: NextRequest) {
	const token = req.cookies.get('session') || ''
	const isAuth = /auth/.test(req.nextUrl.pathname)
	const user = await getCurrentUser(req)

	if (!isAuth && !user) {
		return NextResponse.redirect(new URL('/auth/login', req.url))
	} else if (token && isAuth) {
		const user = await getCurrentUser(req)
		if (user) {
			return NextResponse.redirect(new URL('/agency/new', req.url))
		}
	}

	return NextResponse.next()
}
