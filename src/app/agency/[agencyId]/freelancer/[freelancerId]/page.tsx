'use client'
import EditableMap from '@/components/Agency/Freelancer/EditableMap'
import { useGetFreelancer } from '@/hooks/queries/useGetFreelancer'
import { useUpdateFreelancer } from '@/hooks/queries/useUpdateFreelancer' // Импортируем хук
import { IFreelancer } from '@/models/freelancer.model'
import { ArrowBackIos } from '@mui/icons-material'
import { IconButton, TextField, Typography } from '@mui/material'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const FreelancerPage = () => {
	const { freelancer, isLoading } = useGetFreelancer()
	const { updateFreelancer, isPending } = useUpdateFreelancer()
	const router = useRouter()
	const params = useParams<{ agencyId: string; freelancerId: string }>()

	const [updatedFreelancer, setUpdatedFreelancer] =
		useState<IFreelancer | null>(freelancer)

	useEffect(() => {
		if (freelancer) {
			setUpdatedFreelancer(freelancer)
		}
	}, [freelancer])

	const handleFreelancerUpdate = (updatedData: Partial<IFreelancer>) => {
		if (updatedFreelancer) {
			const newFreelancer = { ...updatedFreelancer, ...updatedData }
			setUpdatedFreelancer(newFreelancer)

			if (!isPending) {
				updateFreelancer(newFreelancer)
			}
		}
	}

	if (isLoading) return <>Loading...</>

	return (
		<div className='container mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg'>
			{updatedFreelancer && (
				<div className='freelancer-info flex flex-col gap-y-3'>
					<Typography variant='h5' component='h2' className='flex items-center'>
						<IconButton
							onClick={() => router.push(`/agency/${params.agencyId}`)}
						>
							<ArrowBackIos />
						</IconButton>
						{updatedFreelancer.username}
					</Typography>
					<TextField
						label='Email'
						value={updatedFreelancer.email}
						aria-readonly={true}
					/>
					<TextField
						label='Job preferences'
						multiline
						value={updatedFreelancer.job_preferences}
					/>
					<TextField
						label='Profile description'
						multiline
						value={updatedFreelancer.profile_description}
					/>

					<EditableMap
						initialMap={updatedFreelancer.search_criteries}
						title='Search Criteries'
						updateFreelancer={handleFreelancerUpdate}
					/>
					<EditableMap
						initialMap={updatedFreelancer.preferred_locations}
						title='Preferred Locations'
						updateFreelancer={handleFreelancerUpdate}
					/>
				</div>
			)}
		</div>
	)
}

export default FreelancerPage
