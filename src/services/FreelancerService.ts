import connectDb from '@/lib/db'
import { FreelancerType, IFreelancer } from '@/models/freelancer.model'
import { IJob } from '@/types/job.type'
import { CustomErrors } from '@/validators/CreateFreelancerValidator'
import axios, { AxiosError } from 'axios'

class FreelancerService {
	async getFreelancersJobs(freelancers: IFreelancer[]) {
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
	async getFreelancerJob(freelancer: string, searchParams: [string, string][]) {
		const queryString = new URLSearchParams(searchParams).toString()
		const response = await axios.get<IJob[]>(
			`/api/freelancer/jobs?freelancerId=${freelancer}&${queryString}`
		)
		return response.data
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
		try {
			const response = (await axios.post('/api/freelancer', { data, agencyId }))
				.data

			return response
		} catch (e) {
			if (e instanceof AxiosError && e.response) {
				const data = e.response?.data
				if (data?.name == 'New Freelancer Validation error') {
					throw new CustomErrors(data.message, data.errors)
				}
			}
			console.log(e)
		}
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
	async getByAgency(agencyId: string) {
		return (await axios.get<IFreelancer[]>('/api/freelancer')).data
	}
}

export const freelancerService = new FreelancerService()
