'use client'

import { useGetFreelancerJobs } from '@/hooks/queries/useGetFreelancerJobs'
import { type AgencyFreelancer } from '@/lib/agency'
import { Switch, TableCell, TableRow } from '@mui/material'
import { useParams, useRouter } from 'next/navigation'
import { useEffect } from 'react'
const AgencyFreelancer = ({
	freelancer,
	endLoading,
	dataLoaded,
}: {
	freelancer: AgencyFreelancer
	endLoading?: () => void
	dataLoaded: boolean
}) => {
	const params = useParams<{ agencyId: string }>()
	const { jobs, isLoading } = useGetFreelancerJobs(freelancer.id)
	const router = useRouter()
	useEffect(() => {
		if (!isLoading && endLoading) endLoading()
	}, [isLoading, endLoading])
	const handleRowClick = (e: React.MouseEvent<HTMLTableRowElement>) => {
		if (e.target instanceof HTMLElement && e.target.closest('[data-switcher]'))
			return
		router.push(`/agency/${params.agencyId}/freelancer/${freelancer.id}`)
	}
	return (
		jobs &&
		!dataLoaded && (
			<TableRow
				component='tr'
				onClick={handleRowClick}
				hover
				key={freelancer.id}
			>
				<TableCell>{freelancer.username}</TableCell>
				<TableCell>{jobs.length}</TableCell>
				<TableCell>
					{jobs.filter(item => item.status === 'TRUE').length}
				</TableCell>
				<TableCell>
					{jobs.filter(item => item.status === 'FALSE').length}
				</TableCell>

				<TableCell data-switcher>
					<Switch defaultChecked></Switch>
				</TableCell>
			</TableRow>
		)
	)
}

export default AgencyFreelancer
