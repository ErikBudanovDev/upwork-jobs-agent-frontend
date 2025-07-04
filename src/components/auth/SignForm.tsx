'use client'

import AuthGoogle from '@/components/auth/AuthGoogle'
import { useSignWithEmailPass } from '@/hooks/useSignWithEmailPass'
import { loginForm } from '@/types/user.type'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Button, IconButton, Link as MuiLink, TextField } from '@mui/material'
import { FirebaseError } from 'firebase/app'
import { FormEvent, useState } from 'react'

const SignForm = ({ loginPage }: { loginPage?: boolean }) => {
	const [fd, setFd] = useState<loginForm>({
		email: '',
		password: '',
		isLogin: loginPage ?? false,
	})
	const { login, error } = useSignWithEmailPass()
	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault()
		try {
			login(fd)
		} catch (e) {
			if (e instanceof FirebaseError) {
				console.log({ e })
			}
		}
	}
	const [passVisible, setPassVisible] = useState(false)
	return (
		<div className='max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg'>
			<h2 className='text-2xl font-semibold mb-4'>
				{loginPage ? 'Login' : 'Register'}
			</h2>
			<form onSubmit={handleSubmit}>
				<span className='text-red-500'>
					{error instanceof FirebaseError && error.message}
				</span>
				<TextField
					fullWidth
					label='Email'
					name='email'
					type='email'
					margin='normal'
					onChange={e => setFd(prev => ({ ...prev, email: e.target.value }))}
				/>
				<div className='relative my-3'>
					<TextField
						fullWidth
						label={'Password'}
						name='password'
						type={passVisible ? 'text' : 'password'}
						onChange={e =>
							setFd(prev => ({ ...prev, password: e.target.value }))
						}
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
				<div className="flex flex-col items-center my-4">
					<MuiLink href={`/auth/${loginPage ? 'register' : 'login'}`} className="mt-2">
						{loginPage ? 'Register' : 'Login'}
					</MuiLink>
				</div>
				<Button type='submit' className='w-full mt-4 bg-primary text-white border border-primary hover:bg-primary/90'>
					Submit
				</Button>
				<div className='pt-4 flex'>
					<AuthGoogle />
				</div>
			</form>
		</div>
	)
}

export default SignForm
