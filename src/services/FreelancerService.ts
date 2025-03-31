import connectDb from '@/lib/db'
import { IFreelancer } from '@/models/freelancer.model'
import { IJob } from '@/types/job.type'
import axios from 'axios'
import { Document } from 'mongoose'

class FreelancerService {
	async getMineJobs(freelancerId: string) {
		try {
			const response = await axios.post<Array<Omit<IJob, keyof Document>>>(
				'/api/freelancer/jobs',
				{
					freelancerId,
				}
			)
			return response.data
		} catch (e) {
			console.log(e)
			throw e
		}
	}
	async getMine(freelancerId: string) {
		try {
			await connectDb()
			const response = await axios.get<IFreelancer>(
				'/api/freelancer?freelancerId=' + freelancerId
			)
			return response.data
		} catch (e) {
			console.log(e)
		}
	}

	async updateFreelancer(data: IFreelancer) {
		try {
			await connectDb()
			const response = await axios.put<IFreelancer>('/api/freelancer', {
				...data,
			})
			return response.data
		} catch (e) {
			console.log(e)
		}
	}
}

export const freelancerService = new FreelancerService()
