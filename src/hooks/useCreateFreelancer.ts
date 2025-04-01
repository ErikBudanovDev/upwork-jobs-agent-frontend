import { FreelancerType, IFreelancer } from '@/models/freelancer.model'
import { freelancerService } from '@/services/FreelancerService'
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
		mutationFn: (data: FreelancerType) =>
			freelancerService.create(data, agencyId),
		mutationKey: ['create freelancer'],
		onSuccess: async (newFreelancer: { newFreelancer: IFreelancer }) => {
			queryClient.setQueryData(
				['get agency freelancers'],
				(oldData: IFreelancer[]) => {
					console.log(oldData)
					return [...oldData, newFreelancer.newFreelancer]
				}
			)
			queryClient.refetchQueries(['get freelancers jobs'])
			router.push(`/agency/${agencyId}`)
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
