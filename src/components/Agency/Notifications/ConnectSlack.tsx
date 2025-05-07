'use client'

import Image from 'next/image'
import Link from 'next/link'

const ConnectSlackButton = () => {
	return (
		<Link href='https://slack.com/oauth/v2/authorize?client_id=2289073005395.8876015846864&scope=channels:join,chat:write,users:read,incoming-webhook,commands&user_scope=channels:write,chat:write,users:read'>
			<Image
				alt='Add to Slack'
				height='40'
				width='139'
				src='https://platform.slack-edge.com/img/add_to_slack.png'
			/>
		</Link>
	)
}

export default ConnectSlackButton
