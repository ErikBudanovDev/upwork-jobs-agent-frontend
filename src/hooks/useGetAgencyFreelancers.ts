import { freelancerService } from '@/services/FreelancerService'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

export const useGetAgencyFreelancers = () => {
	const { data: freelancers, isPending: isLoadingFreelancers } = useQuery({
		queryKey: ['get agency freelancers'],
		queryFn: () => freelancerService.getByAgency(),
	})

	return useMemo(
		() => ({
			freelancers,
			isLoadingFreelancers,
		}),
		[freelancers, isLoadingFreelancers]
	)
}
