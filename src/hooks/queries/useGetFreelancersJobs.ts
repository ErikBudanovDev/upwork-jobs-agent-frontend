import { freelancerService } from '@/services/FreelancerService'
import { useQuery } from '@tanstack/react-query'
import { useParams, useSearchParams } from 'next/navigation'
import { useMemo } from 'react'

export const useGetFreelancerJobs = () => {
	const params = useParams<{ freelancerId: string; status: string }>()
	const [...searchParams] = useSearchParams()
	const { data: jobs, isLoading } = useQuery({
		queryKey: ['get freelancer jobs', params.freelancerId],
		queryFn: () =>
			freelancerService.getFreelancerJob(params.freelancerId, searchParams),
	})

	return useMemo(
		() => ({
			jobs,
			isLoading,
		}),
		[jobs, isLoading]
	)
}
