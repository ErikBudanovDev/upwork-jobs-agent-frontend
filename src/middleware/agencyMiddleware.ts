import agencyService from '@/services/AgencyService'
import authService from '@/services/AuthService'
import { AxiosError } from 'axios'
import { NextRequest, NextResponse } from 'next/server'

export async function agencyMiddleware(req: NextRequest) {
	try {
		const user = await authService.getCurrentUser(req)
		if (user && user.agencyId) {
			const agency = await agencyService.getAgencyByID(user.agencyId.toString())
			console.log(user, user.agencyId)
			if (agency && !req.nextUrl.pathname.startsWith(`/agency/${agency._id}`)) {
				return NextResponse.redirect(new URL(`/agency/${agency._id}`, req.url))
			}
		} else if (req.nextUrl.pathname !== '/agency/new') {
			return NextResponse.redirect(new URL('/agency/new', req.url))
		}
	} catch (e) {
		if (e instanceof AxiosError && e.status === 404) {
			if (
				e.response?.data.error === 'Agency not found' &&
				req.nextUrl.pathname !== '/agency/new'
			) {
				return NextResponse.redirect(new URL('/agency/new', req.url))
			}
			console.log('user not found', e)
		}
	}
	return NextResponse.next()
}
