import { IFreelancer } from '@/models/freelancer.model'
import { freelancerService } from '@/services/FreelancerService'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

export const useGetJobs = (freelancers: IFreelancer[]) => {
	const { data: jobs, isLoading } = useQuery({
		queryKey: ['get jobs'],
		queryFn: () => freelancerService.getFreelancersJobs(freelancers),
	})

	return useMemo(
		() => ({
			jobs,
			isLoading,
		}),
		[jobs, isLoading]
	)
}
