'use client'

import CreateMapField from '@/components/Agency/Freelancer/CreateMapField'
import { useCreateFreelancer } from '@/hooks/useCreateFreelancer'
import { NewFreelancer } from '@/models/freelancer.model'
import { CustomErrors } from '@/validators/CreateFreelancerValidator'
import { Button, InputLabel, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'

export default function ProfileForm() {
	const { createFreelancer, isPending, error } = useCreateFreelancer()
	const [formData, setFormData] = useState<NewFreelancer>({
		username: '',
		email: '',
		profile_description: '',
		search_criteries: {},
		preferred_locations: {},
		job_preferences: '',
	})
	const [searchCriteries, setSearchCriteries] = useState<string[]>([''])
	const [preferredLocations, setPreferedLoactions] = useState<string[]>([''])
	const [clearFields, setClearFields] = useState<Set<string>>(new Set())

	useEffect(() => {
		setFormData((prev: NewFreelancer) => ({
			...prev,
			search_criteries: Object.fromEntries(
				searchCriteries.map((item, index) => [index, item])
			),
			preferred_locations: Object.fromEntries(
				preferredLocations.map((item, index) => [index, item])
			),
		}))
	}, [searchCriteries, preferredLocations])
	useEffect(() => {
		if (error) {
			setClearFields(new Set())
		}
	}, [error])
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		createFreelancer(formData)
		if (!error) {
			setFormData({
				username: '',
				email: '',
				profile_description: '',
				search_criteries: {},
				preferred_locations: {},
				job_preferences: '',
			})
			setSearchCriteries([''])
			setPreferedLoactions([''])
		}
	}
	const handleChange: (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => void = e => {
		const { name, value } = e.target
		setFormData(prev => ({
			...prev,
			[name]: value,
		}))
		setClearFields(prev => new Set(prev).add(name))
	}
	const getError = (fieldName: string) => {
		if (clearFields.has(fieldName)) return false
		if (error && error instanceof CustomErrors) {
			return error.errors.find(e => e.field === fieldName)
		}
		return false
	}
	return (
		<div className='max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg'>
			<h2 className='text-2xl font-semibold mb-4'>Profile Information</h2>
			<form onSubmit={handleSubmit}>
				<TextField
					fullWidth
					label='Username'
					name='username'
					value={formData.username}
					onChange={handleChange}
					margin='normal'
					error={error && getError('username') ? true : false}
				/>
				<TextField
					fullWidth
					label='Email'
					name='email'
					type='email'
					value={formData.email}
					onChange={handleChange}
					margin='normal'
					error={error && getError('email') ? true : false}
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
					error={error && getError('profile_description') ? true : false}
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
					error={error && getError('job_preferences') ? true : false}
				/>
				<InputLabel className='my-4'>
					<span>Search Criteries</span>
					<CreateMapField
						error={error && getError('search_criteries') ? true : false}
						searchCriteries={searchCriteries}
						setObjectValue={data => {
							setSearchCriteries(data)
							if (
								JSON.stringify(formData.search_criteries) !==
								JSON.stringify(data)
							) {
								setClearFields(prev => new Set(prev).add('search_criteries'))
							}
						}}
					/>
				</InputLabel>
				<InputLabel className='my-4'>
					<span>Preferred Locations</span>
					<CreateMapField
						error={error && getError('preferred_locations') ? true : false}
						searchCriteries={preferredLocations}
						setObjectValue={data => {
							setPreferedLoactions(data)
							if (
								JSON.stringify(formData.preferred_locations) !==
								JSON.stringify(data)
							) {
								setClearFields(prev => new Set(prev).add('preferred_locations'))
							}
						}}
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
