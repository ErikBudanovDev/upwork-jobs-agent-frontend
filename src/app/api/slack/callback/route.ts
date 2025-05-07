import connectDb from '@/lib/db'
import { SERVER_CONFIG } from '@/lib/globals'
import User from '@/models/user.model'
import authService from '@/services/AuthService'
import axios from 'axios'
import { NextRequest, NextResponse } from 'next/server'
import qs from 'qs'
export async function GET(req: NextRequest) {
	const code = req.nextUrl.searchParams.get('code')

	if (!code) {
		return NextResponse.json({ error: 'No code provided' }, { status: 400 })
	}

	try {
		const { data } = await axios.post(
			'https://slack.com/api/oauth.v2.access',
			qs.stringify({
				client_id: process.env.NEXT_PUBLIC_SLACK_CLIENT_ID!,
				client_secret: process.env.NEXT_PUBLIC_SLACK_CLIENT_SECRET!,
				code,
				redirect_uri: `${SERVER_CONFIG.server}api/slack/callback`,
			}),
			{
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
			}
		)
		console.log(`${SERVER_CONFIG.server}/api/slack/callback`)
		if (!data.ok) {
			return NextResponse.json({ error: data.error }, { status: 400 })
		}

		connectDb()
		const user = await authService.getCurrentUser()
		if (user) {
			await User.findOneAndUpdate(
				{
					uid: user.uid,
				},
				{
					slackWebhookUrl: data.incoming_webhook.url,
				},
				{
					new: true,
				}
			)
		}
		return NextResponse.redirect(
			`${process.env.NEXT_PUBLIC_SERVER_URI}:3000/agency`,
			{ status: 302 }
		)
	} catch (e) {
		console.log(e)
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 }
		)
	}
}
