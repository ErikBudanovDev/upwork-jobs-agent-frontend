import { API_LINKS, SERVER_CONFIG } from '@/lib/globals'
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
						`${SERVER_CONFIG.server}/${API_LINKS.auth}`,
						{
							headers: {
								Cookie: `session=${token.value}`,
							},
						}
					)
					return response.data
				}
			}
			const response = await axios.get<IUser>(
				`${SERVER_CONFIG.server}/${API_LINKS.auth}`
			)
			return response.data
		} catch (e) {
			if (
				e instanceof AxiosError &&
				e.response?.data.message == 'User not found'
			) {
				console.log('Unauthorized', e.response?.data)
			}
		}
		return null
	}
	async setToken(token: string) {
		const response = await axios.post<IUser>(
			`${SERVER_CONFIG.server}/${API_LINKS.auth}`,
			{
				token,
			}
		)
		return response.data
	}
}

const authService = new AuthService()
export default authService
