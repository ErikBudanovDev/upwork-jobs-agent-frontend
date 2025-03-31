'use client'

import { useGetFreelancerJobs } from '@/hooks/queries/useGetFreelancerJobs'
import { useRemoveFreelancer } from '@/hooks/useRemoveFreelancer'
import { type AgencyFreelancer } from '@/lib/agency'
import { DeleteForever } from '@mui/icons-material'
import { IconButton, Switch, TableCell, TableRow } from '@mui/material'
const AgencyFreelancer = ({
	freelancers,
}: {
	freelancers: AgencyFreelancer[]
}) => {
	const { jobs, isLoading } = useGetFreelancerJobs(freelancers)
	const { removeFreelancer } = useRemoveFreelancer()
	const handleDelete = (freelancerId: string) => {
		removeFreelancer(freelancerId)
	}
	if (isLoading)
		return (
			<TableRow>
				<TableCell>...Loading</TableCell>
			</TableRow>
		)
	return (
		jobs &&
		Boolean(Object.values(jobs).length) &&
		freelancers.map(
			freelancer =>
				jobs[freelancer.id] && (
					<TableRow hover className='cursor-pointer' key={freelancer.id}>
						<TableCell>{freelancer.username}</TableCell>
						<TableCell>{jobs[freelancer.id].length}</TableCell>
						<TableCell>
							{jobs[freelancer.id].filter(job => job.status === 'TRUE').length}
						</TableCell>
						<TableCell>
							{jobs[freelancer.id].filter(job => job.status === 'FALSE').length}
						</TableCell>
						<TableCell>
							<Switch checked />
						</TableCell>
						<TableCell>
							<IconButton
								onClick={() => {
									if (confirm(`Delete freelancer ${freelancer.username} ?`))
										handleDelete(freelancer.id)
								}}
							>
								<DeleteForever />
							</IconButton>
						</TableCell>
					</TableRow>
				)
		)
	)
}

export default AgencyFreelancer
