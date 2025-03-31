import { FreelancerType } from '@/models/freelancer.model'
import { freelancerService } from '@/services/FreelancerService'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useMemo } from 'react'

export const useCreateFreelancer = () => {
	const params = useParams<{ agencyId: string }>()
	const queryClient = useQueryClient()
	const {
		mutate: createFreelancer,
		isPending,
		error,
	} = useMutation({
		mutationFn: (data: FreelancerType) =>
			freelancerService.create(data, params.agencyId),
		mutationKey: ['create freelancer'],
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['get freelancers', params.agencyId],
			})
		},
	})
	return useMemo(
		() => ({
			createFreelancer,
			isPending,
			error,
		}),
		[createFreelancer, isPending, error]
	)
}
