import { IUser } from '@/types/user.type'
import axios, { AxiosError } from 'axios'
import { NextRequest } from 'next/server'

class AuthService {
	async getCurrentUser(req?: NextRequest) {
		try {
			if (req) {
				const token = (await req.cookies.get('session')) || ''
				if (token) {
					const response = await axios.get<IUser>(
						'http://localhost:3000/api/auth/',
						{
							headers: {
								Cookie: `session=${token.value}`,
							},
						}
					)
					return response.data
				}
			}
			const response = await axios.get<IUser>('/api/auth')
			return response.data
		} catch (e) {
			if (
				e instanceof AxiosError &&
				e.response?.data.message == 'User not found'
			) {
				console.log('Unauthorized')
			}
		}
		return null
	}
	async setToken(token: string) {
		const response = await axios.post<IUser>(
			'http://localhost:3000/api/auth/',
			{
				token,
			}
		)
		return response.data
	}
}

const authService = new AuthService()
export default authService
