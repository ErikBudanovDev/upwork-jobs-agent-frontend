import inviteService from '@/services/InviteService'
import { useQuery } from '@tanstack/react-query'

export const useGetInvites = () => {
	const { data: invites, isPending } = useQuery({
		queryKey: ['get user invites'],
		queryFn: async () => await inviteService.getInvites(),
	})

	return { invites, isPending }
}
