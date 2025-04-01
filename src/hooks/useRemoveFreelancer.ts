import { freelancerService } from '@/services/FreelancerService'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useMemo } from 'react'

export const useRemoveFreelancer = () => {
	const { agencyId } = useParams<{ agencyId: string }>()
	const queryClient = useQueryClient()
	const { mutate: removeFreelancer, isPending } = useMutation({
		mutationFn: (freelancerId: string) =>
			freelancerService.delete(freelancerId, agencyId),
		mutationKey: ['delete freelancer'],
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['get agency freelancers'],
			})
		},
	})

	return useMemo(
		() => ({
			removeFreelancer,
			isPending,
		}),
		[removeFreelancer, isPending]
	)
}
