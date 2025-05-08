import userService from '@/services/UserService'
import { IUser } from '@/types/user.type'
import { useMutation } from '@tanstack/react-query'

export const useUpdateUser = () => {
	const {
		mutate: updateUser,
		isPending: pendingUser,
		isError: errorUpdateUser,
		data: dataUpdateUser,
	}: {
		mutate: (data: Partial<IUser>) => void
		isPending: boolean
		isError: boolean
		data: IUser | undefined
	} = useMutation({
		mutationFn: (data: Partial<IUser>) => userService.update(data),
		mutationKey: ['updateEmailNotification'],
	})

	return {
		updateUser,
		pendingUser,
		errorUpdateUser,
		dataUpdateUser,
	}
}
