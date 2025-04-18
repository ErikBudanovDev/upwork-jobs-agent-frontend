'use client'

import { auth } from '@/lib/firebase'
import authService from '@/services/AuthService'
import { Google } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useRouter } from 'next/navigation'

const AuthGoogle = () => {
	const { push } = useRouter()
	const handleGoogleLogin = async () => {
		const provider = new GoogleAuthProvider()
		try {
			const result = await signInWithPopup(auth, provider)
			if (result.user) {
				await authService.setToken(await result.user.getIdToken())
				push('/agency/new')
			}
		} catch (e: unknown) {
			console.log(e)
		}
	}

	return (
		<div>
			<IconButton onClick={() => handleGoogleLogin()}>
				<Google />
			</IconButton>
		</div>
	)
}

export default AuthGoogle
