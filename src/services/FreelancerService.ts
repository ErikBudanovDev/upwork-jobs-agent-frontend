import connectDb from '@/lib/db'
import { API_LINKS } from '@/lib/globals'
import { IFreelancer, NewFreelancer } from '@/models/freelancer.model'
import { IJob } from '@/types/job.type'
import { CustomErrors } from '@/validators/CreateFreelancerValidator'
import axios, { AxiosError } from 'axios'

class FreelancerService {
	async getFreelancersJobs(freelancers: IFreelancer[]) {
		try {
			const response = await axios.post<Record<string, IJob[]>>(
				API_LINKS.jobs as string,
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
			`${API_LINKS.jobs}?freelancerId=${freelancer}&${queryString}`
		)
		return response.data
	}
	async getMine(freelancerId: string) {
		try {
			await connectDb()

			const response = await axios.get<IFreelancer>(
				`${API_LINKS.freelancers}?freelancerId=` + freelancerId
			)
			return response.data
		} catch (e) {
			console.log(e)
		}
	}

	async updateFreelancer(data: Partial<IFreelancer>) {
		try {
			await connectDb()
			const response = await axios.put<IFreelancer>(
				`${API_LINKS.freelancers}`,
				{
					...data,
				}
			)
			return response.data
		} catch (e) {
			console.log(e)
		}
	}

	async create(data: NewFreelancer, agencyId: string) {
		try {
			const response = (
				await axios.post(`${API_LINKS.freelancers}`, { data, agencyId })
			).data

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
			await axios.delete(`${API_LINKS.freelancers}`, {
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
	async getByAgency() {
		return (await axios.get<IFreelancer[]>(`${API_LINKS.freelancers}`)).data
	}
	async setEnabled(data: Partial<IFreelancer>) {
		return (
			await axios.put<IFreelancer[]>(`${API_LINKS.freelancers}`, {
				data,
			})
		).data
	}
}

export const freelancerService = new FreelancerService()
