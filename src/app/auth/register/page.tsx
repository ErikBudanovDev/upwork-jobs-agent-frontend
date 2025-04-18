'use client'

import AuthGoogle from '@/components/auth/AuthGoogle'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Button, IconButton, TextField } from '@mui/material'
import { useState } from 'react'

export default function RegisterPage() {
	const [passVisible, setPassVisible] = useState(false)
	return (
		<div className='max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg'>
			<h2 className='text-2xl font-semibold mb-4'>Register</h2>
			<form>
				<TextField
					fullWidth
					label='Email'
					name='email'
					type='email'
					margin='normal'
				/>
				<div className='relative my-3'>
					<TextField
						fullWidth
						label={'Password'}
						name='password'
						type={passVisible ? 'text' : 'password'}
					/>
					<IconButton
						onClick={() => setPassVisible(prev => !prev)}
						sx={{
							position: 'absolute',
							right: 0,
							top: '50%',
							transform: 'translateY(-50%)',
						}}
					>
						{passVisible ? <VisibilityOff /> : <Visibility />}
					</IconButton>
				</div>
				<span>Or</span>
				<AuthGoogle />
				<Button type='submit' variant='contained' className='w-full mt-4'>
					Submit
				</Button>
			</form>
		</div>
	)
}
