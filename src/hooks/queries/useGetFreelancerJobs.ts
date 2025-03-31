import { freelancerService } from '@/services/FreelancerService'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

export const useGetFreelancerJobs = (freelancerId: string) => {
	const { data: jobs, isLoading } = useQuery({
		queryKey: ['get freelancers jobs', freelancerId],
		queryFn: () => freelancerService.getMineJobs(freelancerId),
	})

	return useMemo(
		() => ({
			jobs,
			isLoading,
		}),
		[jobs, isLoading]
	)
}
