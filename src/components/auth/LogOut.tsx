'use client'

import { auth } from '@/lib/firebase'
import { Logout } from '@mui/icons-material'
import { Button, Typography } from '@mui/material'
import axios from 'axios'
import { signOut } from 'firebase/auth'
import { useRouter } from 'next/navigation'

const LogOut = () => {
	const router = useRouter()
	const handleLogOut = async () => {
		try {
			await signOut(auth)
			const response = await axios.post('/api/auth/logout')
			if (response.status === 200) {
				router.push('/auth/login')
			}
		} catch (e) {
			console.error('Logout error: ', e)
		}
	}
	return (
		<Button onClick={handleLogOut} endIcon={<Logout />} className='w-full bg-primary text-white border border-primary hover:bg-primary/90'>
			<Typography className='ml-2 normal-case'>Logout</Typography>
		</Button>
	)
}

export default LogOut
