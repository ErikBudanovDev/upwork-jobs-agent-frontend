import { InviteDocument } from '@/models/invite.model'
import { InviteAnswer } from '@/types/invite.type'
import axios from 'axios'

class InviteService {
	async createInvite(to: string) {
		const response = await axios.post('http://localhost:3000/api/invite', {
			to,
		})
		return response.data
	}
	async getInvites() {
		const response = await axios.get<InviteDocument[]>(
			'http://localhost:3000/api/invite'
		)
		return response.data
	}
	async answerInvite(data: InviteAnswer) {
		const response = await axios.put('http://localhost:3000/api/invite', data)
		return response.data
	}
}

const inviteService = new InviteService()

export default inviteService
