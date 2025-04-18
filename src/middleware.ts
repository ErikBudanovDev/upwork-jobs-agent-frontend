import { NextRequest, NextResponse } from 'next/server'
import { agencyMiddleware } from './middleware/agencyMiddleware'
import { authMiddleware } from './middleware/authMiddleware'

export default async function middleware(req: NextRequest) {
	const { pathname } = req.nextUrl

	if (
		pathname.startsWith('/_next') ||
		pathname.startsWith('/favicon.ico') ||
		pathname.startsWith('/api')
	) {
		return NextResponse.next()
	}
	const result = await authMiddleware(req)
	if (!result.ok) {
		return result
	}

	if (pathname.startsWith('/agency')) {
		const agencyResult = agencyMiddleware(req)
		return agencyResult
	}
	return NextResponse.next()
}
