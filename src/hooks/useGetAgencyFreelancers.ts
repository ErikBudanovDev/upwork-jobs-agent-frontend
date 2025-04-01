import { freelancerService } from '@/services/FreelancerService'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useMemo } from 'react'

export const useGetAgencyFreelancers = () => {
	const { agencyId } = useParams<{ agencyId: string }>()
	const { data: freelancers, isPending: isLoadingFreelancers } = useQuery({
		queryKey: ['get agency freelancers'],
		queryFn: () => freelancerService.getByAgency(agencyId),
	})

	return useMemo(
		() => ({
			freelancers,
			isLoadingFreelancers,
		}),
		[freelancers, isLoadingFreelancers]
	)
}
