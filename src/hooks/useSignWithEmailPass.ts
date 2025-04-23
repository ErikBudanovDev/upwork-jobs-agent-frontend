import { auth } from '@/lib/firebase'
import { SERVER_CONFIG } from '@/lib/globals'
import authService from '@/services/AuthService'
import { loginForm } from '@/types/user.type'
import { useMutation } from '@tanstack/react-query'
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	UserCredential,
} from 'firebase/auth'
import { useRouter } from 'next/navigation'

export const useSignWithEmailPass = () => {
	const { push } = useRouter()
	const {
		mutate: login,
		error,
		isPending,
	} = useMutation({
		mutationFn: async (data: loginForm) => {
			return data.isLogin
				? await signInWithEmailAndPassword(auth, data.email, data.password)
				: await createUserWithEmailAndPassword(auth, data.email, data.password)
		},
		async onSuccess(data: UserCredential) {
			if (data.user) {
				await authService.setToken(await data.user.getIdToken())
			}
			push(`${SERVER_CONFIG.server}:${SERVER_CONFIG.port}/agency/new`)
		},
	})
	return { login, error, isPending }
}
