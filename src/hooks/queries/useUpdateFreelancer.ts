import { IFreelancer } from '@/models/freelancer.model'
import { freelancerService } from '@/services/FreelancerService'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'

export const useUpdateFreelancer = () => {
	const query = useQueryClient()
	const { mutate: updateFreelancer, isPending } = useMutation({
		mutationKey: ['update freelancer'],
		mutationFn: (data: Partial<IFreelancer>) =>
			freelancerService.updateFreelancer(data),
		onSuccess(data) {
			if (data) {
				query.refetchQueries({
					queryKey: ['get freelancer', data._id],
				})
				query.setQueryData(
					['get agency freelancers'],
					(old: IFreelancer[] | undefined) => {
						if (!old) return old
						return old.map(freelancer =>
							freelancer._id === data._id
								? { ...freelancer, ...data }
								: freelancer
						)
					}
				)
			}
		},
	})

	return useMemo(
		() => ({ updateFreelancer, isPending }),
		[updateFreelancer, isPending]
	)
}
