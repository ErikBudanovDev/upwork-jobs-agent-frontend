import { Agency } from '@/lib/agency'
import { API_LINKS, SERVER_CONFIG } from '@/lib/globals'
import { AgencyDocument } from '@/models/agency.model'
import { IAgency } from '@/types/agency.type'
import { IUser } from '@/types/user.type'
import axios from 'axios'
import { NextRequest } from 'next/server'

class AgencyService {
	async createAgency(data: IAgency) {
		const response = await axios.post('/api/agency', data)
		return response.data
	}
	async getAgencyByID(id: string) {
		const response = await axios.get<AgencyDocument>(
			`${SERVER_CONFIG.server}/${API_LINKS.agency}?id=${id}`
		)
		return response.data
	}

	async getMineAgency(req?: NextRequest) {
		if (req) {
			const token = req.cookies.get('session') || ''
			if (token) {
				const response = await axios.get<Agency>(
					`${SERVER_CONFIG.server}/${API_LINKS.agency}`,
					{
						headers: {
							Cookie: `session=${token.value};`,
						},
					}
				)
				return response.data
			}
		}
		const response = await axios.get<Agency>(
			`${SERVER_CONFIG.server}/${API_LINKS.agency}`
		)
		return response.data
	}
	async getAgencyMembers() {
		const response = await axios.get<IUser[]>(
			`${SERVER_CONFIG.server}/${API_LINKS.agency}/members`
		)
		return response.data
	}
}
const agencyService = new AgencyService()
export default agencyService
