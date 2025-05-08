'use client'

import { useUser } from '@/contexts/UserContext'
import authService from '@/services/AuthService'
import Button from '@mui/material/Button'
import Image from 'next/image'
import { useEffect, useState } from 'react'

const ConnectSlackButton = () => {
	const [token, setToken] = useState('')
	const user = useUser()
	const [slackConnected, setSlackConnected] = useState(
		user.user?.slackWebhookUrl ?? false
	)

	useEffect(() => {
		const getToken = async () => {
			const { token: tokenFromApi } = await authService.getToken()
			setToken(tokenFromApi)
		}
		getToken()
	}, [])
	useEffect(() => {
		setSlackConnected(user.user?.slackWebhookUrl ?? false)
	}, [user.user])
	const handleSlackConnect = () => {
		const slackUrl = `https://slack.com/oauth/v2/authorize?client_id=2289073005395.8876015846864&scope=channels:join,chat:write,users:read,incoming-webhook,commands&user_scope=channels:write,chat:write,users:read&state=${token}`

		const popup = window.open(slackUrl, '_blank', 'width=500,height=600')

		const interval = setInterval(() => {
			if (popup?.closed) {
				clearInterval(interval)
				setSlackConnected(true)
			}
		}, 500)
	}
	return (
		token &&
		(slackConnected ? (
			<Button
				startIcon={
					<Image
						src='/logo-slack-svgrepo-com.svg'
						width={25}
						height={25}
						alt='Slack'
					/>
				}
				variant='outlined'
				color='inherit'
			>
				Slack Connected
			</Button>
		) : (
			<button onClick={handleSlackConnect}>
				<Image
					alt='Add to Slack'
					height='40'
					width='139'
					src='https://platform.slack-edge.com/img/add_to_slack.png'
				/>
			</button>
		))
	)
}

export default ConnectSlackButton
