'use client'

import CreateMapField from '@/components/Agency/Freelancer/CreateMapField'
import { useCreateFreelancer } from '@/hooks/useCreateFreelancer'
import { Freelancer } from '@/models/freelancer.model'
import { Button, InputLabel, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'

export default function ProfileForm() {
	const { createFreelancer, isPending, error } = useCreateFreelancer()
	const [formData, setFormData] = useState<Freelancer>({
		username: '',
		email: '',
		profile_description: '',
		search_criteries: {},
		preferred_locations: {},
		job_preferences: '',
	})
	const [searchCriteries, setSearchCriteries] = useState<string[]>([''])
	const [preferredLocations, setPreferedLoactions] = useState<string[]>([''])

	useEffect(() => {
		setFormData(prev => ({
			...prev,
			search_criteries: Object.fromEntries(
				searchCriteries.map((item, index) => [index, item])
			),
		}))
	}, [searchCriteries, preferredLocations])
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		createFreelancer(formData)
		// setFormData({
		// 	username: '',
		// 	email: '',
		// 	profile_description: '',
		// 	search_criteries: {},
		// 	preferred_locations: {},
		// 	job_preferences: '',
		// })
	}
	const handleChange: (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => void = e => {
		const { name, value } = e.target
		setFormData(prev => ({
			...prev,
			[name]: value,
		}))
	}
	return (
		<div className='max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg'>
			<h2 className='text-2xl font-semibold mb-4'>Profile Information</h2>
			<form onSubmit={handleSubmit}>
				{error && <span className='text-red-400'>{error.message}</span>}
				<TextField
					fullWidth
					label='Username'
					name='username'
					value={formData.username}
					onChange={handleChange}
					margin='normal'
				/>
				<TextField
					fullWidth
					label='Email'
					name='email'
					type='email'
					value={formData.email}
					onChange={handleChange}
					margin='normal'
				/>
				<TextField
					fullWidth
					label='Profile Description'
					name='profile_description'
					multiline
					rows={4}
					value={formData.profile_description}
					onChange={handleChange}
					margin='normal'
				/>
				<TextField
					fullWidth
					label='Job Preferences'
					name='job_preferences'
					multiline
					rows={4}
					value={formData.job_preferences}
					onChange={handleChange}
					margin='normal'
				/>
				<InputLabel className='my-4'>
					<span>Search Criteries</span>
					<CreateMapField
						searchCriteries={searchCriteries}
						setObjectValue={setSearchCriteries}
					/>
				</InputLabel>
				<InputLabel className='my-4'>
					<span>Preferred Locations</span>
					<CreateMapField
						searchCriteries={preferredLocations}
						setObjectValue={setPreferedLoactions}
					/>
				</InputLabel>
				<Button
					disabled={isPending}
					type='submit'
					variant='contained'
					className='w-full mt-4'
				>
					Submit
				</Button>
			</form>
		</div>
	)
}
