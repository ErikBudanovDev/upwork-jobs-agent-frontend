import agencyService from '@/services/AgencyService'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

export const useGetAgency = () => {
	const { data: agency, isPending } = useQuery({
		queryKey: ['get agency'],
		queryFn: async () => await agencyService.getMineAgency(),
	})

	return useMemo(
		() => ({
			agency,
			isPending,
		}),
		[agency, isPending]
	)
}
