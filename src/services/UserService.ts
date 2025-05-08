import { IUser } from '@/types/user.type'
import axios from 'axios'

class UserService {
	async update(data: Partial<IUser>) {
		const response = await axios.put('/api/user', data)
		return response.data
	}
}

const userService = new UserService()
export default userService
