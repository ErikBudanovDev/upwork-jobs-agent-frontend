'use client'

import authService from '@/services/AuthService'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const ConnectSlackButton = () => {
	const [token, setToken] = useState('')

	useEffect(() => {
		const getToken = async () => {
			const { token: tokenFromApi } = await authService.getToken()
			setToken(tokenFromApi)
		}

		getToken()
	})
	console.log(token)
	return (
		token && (
			<Link
				href={`https://slack.com/oauth/v2/authorize?client_id=2289073005395.8876015846864&scope=channels:join,chat:write,users:read,incoming-webhook,commands&user_scope=channels:write,chat:write,users:read&state=${token}`}
			>
				<Image
					alt='Add to Slack'
					height='40'
					width='139'
					src='https://platform.slack-edge.com/img/add_to_slack.png'
				/>
			</Link>
		)
	)
}

export default ConnectSlackButton
