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

async function getAgencyByID(id: string, req: NextRequest) {
	try {
		const token = req.cookies.get('session')
		const headers: Record<string, string> = {}
		if (token) {
			headers.Cookie = `session=${token.value}`
		}
		
		const response = await fetch(`${SERVER_CONFIG.server}/${API_LINKS.agency}?id=${id}`, {
			headers
		})
		if (response.ok) {
			return await response.json()
		}
	} catch (e) {
		console.log('Agency fetch error:', e)
	}
	return null
}

export async function agencyMiddleware(req: NextRequest) {
	try {
		const user = await getCurrentUser(req)
		if (user && user.agencyId) {
			const agency = await getAgencyByID(user.agencyId.toString(), req)
			if (agency && !req.nextUrl.pathname.startsWith(`/agency/${agency._id}`)) {
				return NextResponse.redirect(new URL(`/agency/${agency._id}`, req.url))
			}
		} else if (req.nextUrl.pathname !== '/agency/new') {
			return NextResponse.redirect(new URL('/agency/new', req.url))
		}
	} catch (e) {
		console.log('Middleware error:', e)
		// If there's an error, redirect to agency/new as fallback
		if (req.nextUrl.pathname !== '/agency/new') {
			return NextResponse.redirect(new URL('/agency/new', req.url))
		}
	}
	return NextResponse.next()
}
