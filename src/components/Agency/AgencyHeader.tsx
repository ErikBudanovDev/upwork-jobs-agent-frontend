'use client'

import { useUser } from '@/contexts/UserContext'
import { useGetAgency } from '@/hooks/useGetAgency'
import { AccountCircle, Add } from '@mui/icons-material'
import { Box, Button, Typography } from '@mui/material'
import Link from 'next/link'
import LogOut from '../auth/LogOut'
import Invite from './Invites/Invite'

const AgencyHeader = () => {
	const { agency } = useGetAgency()

	const { user, loading } = useUser()
	return (
		agency && (
			<header className='py-2'>
				<div className='container mx-auto'>
					<Box className='flex justify-between'>
						<Link href={`/agency/${agency.id}`}>
							<Button
								startIcon={<AccountCircle />}
								color='inherit'
								className=''
							>
								<Typography className='ml-2 normal-case'>
									{!loading && `${agency.name} | ${user?.username}`}
								</Typography>
							</Button>
						</Link>
						<div className='flex gap-2'>
							<Invite />

							<Link href={`/agency/${agency._id}/freelancer/new`}>
								<Button startIcon=<Add /> color='inherit' variant='contained'>
									<Typography className='ml-2 normal-case'>
										Add Freelancer
									</Typography>
								</Button>
							</Link>
							<LogOut />
						</div>
					</Box>
				</div>
			</header>
		)
	)
}

export default AgencyHeader
