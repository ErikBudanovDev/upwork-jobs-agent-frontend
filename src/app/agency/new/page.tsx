'use client'

import UserInvites from '@/components/Agency/Invites/UserInvites'
import { useCreateAgency } from '@/hooks/useCreateAgency'
import { useGetInvites } from '@/hooks/useGetInvites'
import { Button, TextField } from '@mui/material'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

export default function AgencyForm() {
	const { createAgency, isPending } = useCreateAgency()
	const [agencyName, setAgencyName] = useState('')
	const { invites, isPending: invitesPending } = useGetInvites()
	const router = useRouter()
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		createAgency({
			name: agencyName,
		})
		router.refresh()
	}
	if (invitesPending) return <>Loading...</>
	if (invites && invites.length) return <UserInvites invites={invites} />
	return (
		<div className='max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg'>
			<h2 className='text-2xl font-semibold mb-4'>Profile Information</h2>
			<form onSubmit={handleSubmit}>
				<TextField
					fullWidth
					label='Agency name'
					name='agencyName'
					margin='normal'
					onChange={e => setAgencyName(e.target.value)}
				/>

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
