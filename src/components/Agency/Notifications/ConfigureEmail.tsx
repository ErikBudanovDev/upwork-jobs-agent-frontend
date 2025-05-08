'use client'

import { useUser } from '@/contexts/UserContext'
import { useUpdateUser } from '@/hooks/useUpdateUser'
import { MailOutline } from '@mui/icons-material'
import { Button, Switch } from '@mui/material'
import { useEffect, useState } from 'react'

const ConfigureEmail = () => {
	const user = useUser()
	const [emailNotifications, setEmailNotifications] = useState(false)
	const { updateUser, pendingUser, dataUpdateUser } = useUpdateUser()
	useEffect(() => {
		if (user.user) {
			setEmailNotifications(user.user.emailNotifications)
		}
	}, [user.user])
	useEffect(() => {
		console.log(dataUpdateUser)
		if (dataUpdateUser && !pendingUser) {
			setEmailNotifications(dataUpdateUser.emailNotifications)
		}
	}, [dataUpdateUser, pendingUser])
	const handleChange = async () => {
		updateUser({ emailNotifications: !emailNotifications })
	}
	const updatingClasses = 'opacity-50 pointer-events-none'

	return (
		user.user && (
			<Button
				variant='outlined'
				color='inherit'
				onClick={handleChange}
				className={`${pendingUser ? updatingClasses : ''}`}
			>
				<MailOutline />
				<Switch className='pointer-events-none' checked={emailNotifications} />
			</Button>
		)
	)
}

export default ConfigureEmail
