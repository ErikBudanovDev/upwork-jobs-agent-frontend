import { AgencyFreelancer } from '@/lib/agency'
import { freelancerService } from '@/services/FreelancerService'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useMemo } from 'react'

export const useGetFreelancerJobs = (freelancers: AgencyFreelancer[]) => {
	const { agencyId } = useParams<{ agencyId: string }>()
	const { data: jobs, isLoading } = useQuery({
		queryKey: ['get freelancers jobs', agencyId],
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
