'use client'

import { useUser } from '@/contexts/UserContext'
import { useGetAgency } from '@/hooks/useGetAgency'
import { AccountCircle } from '@mui/icons-material'
import { Box, Button, Typography } from '@mui/material'
import Link from 'next/link'

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
					</Box>
				</div>
			</header>
		)
	)
}

export default AgencyHeader
