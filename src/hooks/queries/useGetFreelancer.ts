import { freelancerService } from '@/services/FreelancerService'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useMemo } from 'react'

export const useGetFreelancer = () => {
	const params = useParams<{ freelancerId: string }>()

	const { data: freelancer, isLoading } = useQuery({
		queryKey: ['get freelancer', params.freelancerId],
		queryFn: () => freelancerService.getMine(params.freelancerId),
	})

	return useMemo(
		() => ({
			freelancer,
			isLoading,
		}),
		[freelancer, isLoading]
	)
}
