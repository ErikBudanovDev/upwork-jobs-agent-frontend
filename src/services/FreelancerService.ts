import { AgencyFreelancer } from '@/lib/agency'
import connectDb from '@/lib/db'
import { FreelancerType, IFreelancer } from '@/models/freelancer.model'
import { IJob } from '@/types/job.type'
import axios from 'axios'

class FreelancerService {
	async getFreelancersJobs(freelancers: AgencyFreelancer[]) {
		try {
			const response = await axios.post<Record<string, IJob[]>>(
				'/api/freelancer/jobs',
				{
					freelancers,
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

	async create(data: FreelancerType, agencyId: string) {
		await axios.post('/api/freelancer', { data, agencyId })
	}
	async delete(freelancer: string, agencyId: string) {
		try {
			await axios.delete('/api/freelancer', {
				data: {
					freelancer,
					agencyId,
				},
			})
			return { status: true }
		} catch (e) {
			console.log(e)
		}
	}
}

export const freelancerService = new FreelancerService()
