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
		<button
			onClick={handleGoogleLogin}
			className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded shadow hover:bg-gray-100 transition-colors w-full justify-center"
		>
			<svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
				<g clipPath="url(#clip0_17_40)">
					<path d="M47.532 24.552c0-1.636-.146-3.2-.418-4.704H24.48v9.02h13.02c-.56 3.02-2.24 5.58-4.78 7.3v6.06h7.74c4.54-4.18 7.07-10.34 7.07-17.676z" fill="#4285F4"/>
					<path d="M24.48 48c6.48 0 11.92-2.16 15.89-5.88l-7.74-6.06c-2.16 1.44-4.92 2.3-8.15 2.3-6.26 0-11.56-4.22-13.46-9.9H2.5v6.22C6.46 43.78 14.7 48 24.48 48z" fill="#34A853"/>
					<path d="M11.02 28.46a14.77 14.77 0 0 1 0-9.42v-6.22H2.5a24.01 24.01 0 0 0 0 21.86l8.52-6.22z" fill="#FBBC05"/>
					<path d="M24.48 9.54c3.54 0 6.7 1.22 9.2 3.62l6.88-6.88C36.4 2.16 30.96 0 24.48 0 14.7 0 6.46 4.22 2.5 10.82l8.52 6.22c1.9-5.68 7.2-9.9 13.46-9.9z" fill="#EA4335"/>
				</g>
				<defs>
					<clipPath id="clip0_17_40">
						<path fill="#fff" d="M0 0h48v48H0z"/>
					</clipPath>
				</defs>
			</svg>
			<span className="font-medium">Sign in with Google</span>
		</button>
	)
}

export default AuthGoogle
