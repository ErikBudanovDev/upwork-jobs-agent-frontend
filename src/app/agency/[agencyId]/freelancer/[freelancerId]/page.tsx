'use client'

import EditableMap from '@/components/Agency/Freelancer/EditableMap'
import { useGetFreelancer } from '@/hooks/queries/useGetFreelancer'
import { useUpdateFreelancer } from '@/hooks/queries/useUpdateFreelancer'
import { ArrowBackIos } from '@mui/icons-material'
import { IconButton, Typography } from '@mui/material'
import { useParams, useRouter } from 'next/navigation'

const FreelancerPage = () => {
	const { freelancer, isLoading } = useGetFreelancer()
	const router = useRouter()
	const { updateFreelancer } = useUpdateFreelancer()
	const params = useParams<{ agencyId: string; freelancerId: string }>()
	if (isLoading) return <>..Loading</>
	return (
		<>
			{freelancer && (
				<>
					<IconButton onClick={() => router.push(`/agency/${params.agencyId}`)}>
						<ArrowBackIos />
					</IconButton>
					<div className='freelancer-info flex flex-col gap-y-3'>
						<Typography variant='h5' component='h2'>
							Username : {freelancer.username}
						</Typography>
						<EditableMap
							initialMap={freelancer.search_criteries}
							title='Search Criteries'
							updateFreelancer={() => updateFreelancer(freelancer)}
						/>
						<EditableMap
							initialMap={freelancer.preferred_locations}
							title='Preferred Locations'
							updateFreelancer={() => updateFreelancer(freelancer)}
						/>
					</div>
				</>
			)}
		</>
	)
}

export default FreelancerPage
