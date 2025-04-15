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
		useState<IFreelancer | null>(freelancer ?? null)

	useEffect(() => {
		if (freelancer) {
			setUpdatedFreelancer(freelancer)
		}
	}, [freelancer])

	const handleFreelancerUpdate = (updatedData: Partial<IFreelancer>) => {
		if (updatedFreelancer) {
			//eslint-disable-next-line @typescript-eslint/no-unused-vars
			const { $assertPopulated, ...newFreelancer } = {
				...updatedFreelancer,
				...updatedData,
			}
			setUpdatedFreelancer(newFreelancer as IFreelancer)

			if (!isPending) {
				updateFreelancer(newFreelancer as IFreelancer)
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
						defaultValue={updatedFreelancer.job_preferences}
						onBlur={e => {
							handleFreelancerUpdate({
								job_preferences: e.currentTarget.value,
							})
						}}
					/>
					<TextField
						label='Profile description'
						multiline
						defaultValue={updatedFreelancer.profile_description}
						onBlur={e => {
							handleFreelancerUpdate({
								profile_description: e.target.value,
							})
						}}
					/>

					<EditableMap
						initialMap={updatedFreelancer.search_criteries}
						title='Search Criteries'
						updateFreelancer={handleFreelancerUpdate}
						keyName='search_criteries'
					/>
					<EditableMap
						initialMap={updatedFreelancer.preferred_locations}
						title='Preferred Locations'
						updateFreelancer={handleFreelancerUpdate}
						keyName='preferred_locations'
					/>
				</div>
			)}
		</div>
	)
}

export default FreelancerPage
