import connectDb from '@/lib/db'
import { adminAuth } from '@/lib/firebase-admin'
import { SERVER_CONFIG } from '@/lib/globals'
import User from '@/models/user.model'
import axios from 'axios'
import { NextRequest, NextResponse } from 'next/server'
import qs from 'qs'

export async function GET(req: NextRequest) {
	const code = req.nextUrl.searchParams.get('code')
	if (!code) {
		return NextResponse.json({ error: 'No code provided' }, { status: 400 })
	}

	try {
		const html = `
		<!DOCTYPE html>
		<html>
			<body>
				<script>
					window.close();
				</script>
				<p>Authorization successful. You can close this window.</p>
			</body>
		</html>
	`
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
		if (!data.ok) {
			return NextResponse.json({ error: data.error }, { status: 400 })
		}

		connectDb()
		const token = req.nextUrl.searchParams.get('state')
		if (token) {
			const user = await adminAuth.verifyIdToken(token)
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
		}

		return new NextResponse(html, {
			headers: {
				'Content-Type': 'text/html',
			},
		})
	} catch (e) {
		console.log(e)
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 }
		)
	}
}
