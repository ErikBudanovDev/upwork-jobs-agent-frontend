import inviteService from '@/services/InviteService'
import { InviteAnswer } from '@/types/invite.type'
import { useMutation } from '@tanstack/react-query'

export const useAnswerInvite = () => {
	const { mutate: answerInvite, isPending } = useMutation({
		mutationKey: ['accept invite'],
		mutationFn: async (data: InviteAnswer) => inviteService.answerInvite(data),
	})

	return { answerInvite, isPending }
}
