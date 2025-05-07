import { IFreelancer, NewFreelancer } from '@/models/freelancer.model'
import { freelancerService } from '@/services/FreelancerService'
import { IJob } from '@/types/job.type'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import { useMemo } from 'react'

export const useCreateFreelancer = () => {
	const { agencyId } = useParams<{ agencyId: string }>()
	const queryClient = useQueryClient()
	const router = useRouter()
	const {
		mutate: createFreelancer,
		isPending,
		error,
	} = useMutation({
		mutationFn: (data: NewFreelancer) =>
			freelancerService.create(data, agencyId),
		mutationKey: ['create freelancer'],
		onSuccess: async (newFreelancer: { newFreelancer: IFreelancer }) => {
			queryClient.setQueryData(
				['get agency freelancers'],
				(oldFreelancers: IFreelancer[]) => {
					return [...oldFreelancers, newFreelancer.newFreelancer]
				}
			)
			queryClient.setQueryData(
				['get jobs'],
				(oldData: Record<string, IJob>) => {
					const newFreelancerId = newFreelancer.newFreelancer.id
					return {
						...oldData,
						[newFreelancerId]: [],
					}
				}
			)
			queryClient.invalidateQueries({
				queryKey: ['get agency freelancers'],
			})
			queryClient.invalidateQueries({
				queryKey: ['get jobs'],
			})
			router.push(`/agency/${agencyId}`)
		},
		onError(error: unknown) {
			return error
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
