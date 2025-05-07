import agencyService from '@/services/AgencyService'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

export const useGetMembers = () => {
	const { data: members, isPending } = useQuery({
		queryKey: ['get agency members'],
		queryFn: async () => await agencyService.getAgencyMembers(),
	})

	return useMemo(() => ({ members, isPending }), [members, isPending])
}
