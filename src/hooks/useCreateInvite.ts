import inviteService from '@/services/InviteService'
import { useMutation } from '@tanstack/react-query'

export const useCreateInvite = () => {
	const {
		mutate: createInvite,
		data: invite,
		isPending,
	} = useMutation({
		mutationKey: ['create invite'],
		mutationFn: async (data: string) => await inviteService.createInvite(data),
	})

	return { createInvite, invite, isPending }
}
