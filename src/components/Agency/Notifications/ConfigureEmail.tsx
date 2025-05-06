'use client'

import { useUser } from '@/contexts/UserContext'
import { MailOutline } from '@mui/icons-material'
import { Button, Switch } from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'

const ConfigureEmail = () => {
	const user = useUser()
	const [emailNotifications, setEmailNotifications] = useState(false)
	useEffect(() => {
		if (user.user) {
			setEmailNotifications(user.user.emailNotifications)
		}
	}, [user])
	const handleChange = async () => {
		await axios.put('/api/user', {
			emailNotifications: !emailNotifications,
		})
		setEmailNotifications(!emailNotifications)
	}
	return (
		user.user && (
			<Button variant='outlined' color='inherit' onClick={handleChange}>
				<MailOutline />
				<Switch className='pointer-events-none' checked={emailNotifications} />
			</Button>
		)
	)
}

export default ConfigureEmail
