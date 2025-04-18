import { useUser } from '@/contexts/UserContext'
import agencyService from '@/services/AgencyService'
import { IAgency } from '@/types/agency.type'
import { useMutation } from '@tanstack/react-query'

export const useCreateAgency = () => {
	const user = useUser()
	const {
		mutate: createAgency,
		isPending,
		error,
		data: agency,
	} = useMutation({
		mutationKey: ['create agency'],
		mutationFn: (data: IAgency) => agencyService.createAgency(data),
	})

	return { createAgency, isPending, error, agency }
}
