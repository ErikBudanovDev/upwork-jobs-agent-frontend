'use client'

import { useGetJobs } from '@/hooks/queries/useGetJobs'
import { useUpdateFreelancer } from '@/hooks/queries/useUpdateFreelancer'
import { useGetAgency } from '@/hooks/useGetAgency'
import { useRemoveFreelancer } from '@/hooks/useRemoveFreelancer'
import { type AgencyFreelancer } from '@/lib/agency'
import { IFreelancer } from '@/models/freelancer.model'
import { DeleteForever } from '@mui/icons-material'
import { IconButton, Switch, TableCell, TableRow } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { MouseEvent } from 'react'
const AgencyFreelancer = ({ freelancers }: { freelancers: IFreelancer[] }) => {
	const { jobs, isLoading } = useGetJobs(freelancers)
	const { removeFreelancer } = useRemoveFreelancer()
	const { push } = useRouter()
	const { agency } = useGetAgency()
	const { updateFreelancer, isPending } = useUpdateFreelancer()
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
		agency &&
		jobs &&
		Boolean(Object.values(jobs).length) &&
		freelancers.length > 0 &&
		freelancers.map(
			freelancer =>
				jobs[freelancer._id as string] && (
					<TableRow
						hover
						onClick={(e: MouseEvent<HTMLElement>) => {
							if (
								e.target instanceof HTMLElement &&
								!e.target.closest('.switcher, .delete, .jobs')
							) {
								push(`/agency/${agency._id}/freelancer/${freelancer._id}`)
							}
						}}
						className='cursor-pointer'
						key={freelancer._id as string}
					>
						<TableCell>{freelancer.username}</TableCell>
						<TableCell className='jobs'>
							<Link
								className='underline text-blue-500'
								href={`/agency/${agency._id}/freelancer/${freelancer._id}/jobs`}
							>
								{jobs[freelancer._id as string].length}
							</Link>
						</TableCell>
						<TableCell className='jobs'>
							<Link
								className='underline text-blue-500'
								href={`/agency/${agency._id}/freelancer/${freelancer._id}/jobs?status=true`}
							>
								{
									jobs[freelancer._id as string].filter(
										job => job.status === 'TRUE'
									).length
								}
							</Link>
						</TableCell>
						<TableCell className='jobs'>
							<Link
								className='underline text-blue-500'
								href={`/agency/${agency._id}/freelancer/${freelancer._id}/jobs?status=false`}
							>
								{
									jobs[freelancer._id as string].filter(
										job => job.status === 'FALSE'
									).length
								}
							</Link>
						</TableCell>
						<TableCell className='switcher'>
							<Switch
								onChange={e =>
									updateFreelancer({
										enabled: e.target.checked,
										_id: freelancer._id,
									})
								}
								disabled={isPending}
								checked={freelancer.enabled}
							/>
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
