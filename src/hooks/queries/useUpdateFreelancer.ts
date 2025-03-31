import { IFreelancer } from '@/models/freelancer.model'
import { freelancerService } from '@/services/FreelancerService'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'

export const useUpdateFreelancer = () => {
	const query = useQueryClient()
	const { mutate: updateFreelancer, isPending } = useMutation({
		mutationKey: ['update freelancer'],
		mutationFn: (data: IFreelancer) => freelancerService.updateFreelancer(data),
		onSuccess() {
			query.invalidateQueries({
				queryKey: ['get freelancer'],
			})
		},
	})

	return useMemo(
		() => ({ updateFreelancer, isPending }),
		[updateFreelancer, isPending]
	)
}
