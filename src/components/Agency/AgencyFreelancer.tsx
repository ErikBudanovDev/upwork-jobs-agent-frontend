'use client'

import { useGetFreelancerJobs } from '@/hooks/queries/useGetFreelancerJobs'
import { useRemoveFreelancer } from '@/hooks/useRemoveFreelancer'
import { agency, type AgencyFreelancer } from '@/lib/agency'
import { IFreelancer } from '@/models/freelancer.model'
import { DeleteForever } from '@mui/icons-material'
import { IconButton, Switch, TableCell, TableRow } from '@mui/material'
import { useRouter } from 'next/navigation'
import { MouseEvent } from 'react'
const AgencyFreelancer = ({ freelancers }: { freelancers: IFreelancer[] }) => {
	const { jobs, isLoading } = useGetFreelancerJobs(freelancers)
	const { removeFreelancer } = useRemoveFreelancer()
	const { push } = useRouter()
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
				jobs[freelancer._id as string] && (
					<TableRow
						hover
						onClick={(e: MouseEvent<HTMLElement>) => {
							if (
								e.target instanceof HTMLElement &&
								!e.target.closest('.switcher, .delete')
							) {
								push(`/agency/${agency.id}/freelancer/${freelancer._id}`)
							}
						}}
						className='cursor-pointer'
						key={freelancer._id as string}
					>
						<TableCell>{freelancer.username}</TableCell>
						<TableCell>{jobs[freelancer._id as string].length}</TableCell>
						<TableCell>
							{
								jobs[freelancer._id as string].filter(
									job => job.status === 'TRUE'
								).length
							}
						</TableCell>
						<TableCell>
							{
								jobs[freelancer._id as string].filter(
									job => job.status === 'FALSE'
								).length
							}
						</TableCell>
						<TableCell className='switcher'>
							<Switch />
						</TableCell>
						<TableCell className='delete'>
							<IconButton
								onClick={() => {
									if (confirm(`Delete freelancer ${freelancer.username} ?`))
										handleDelete(freelancer._id as string)
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
