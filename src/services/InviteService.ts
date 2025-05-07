import { API_LINKS, SERVER_CONFIG } from '@/lib/globals'
import { InviteDocument } from '@/models/invite.model'
import { InviteAnswer } from '@/types/invite.type'
import axios from 'axios'

class InviteService {
	async createInvite(to: string) {
		const response = await axios.post(
			`${SERVER_CONFIG.server}/${API_LINKS.invite}`,
			{
				to,
			}
		)
		return response.data
	}
	async getInvites() {
		const response = await axios.get<InviteDocument[]>(
			`${SERVER_CONFIG.server}/${API_LINKS.invite}`
		)
		return response.data
	}
	async answerInvite(data: InviteAnswer) {
		const response = await axios.put(
			`${SERVER_CONFIG.server}/${API_LINKS.invite}`,
			data
		)
		return response.data
	}
}

const inviteService = new InviteService()

export default inviteService
