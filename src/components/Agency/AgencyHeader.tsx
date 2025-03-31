import { Agency } from '@/lib/agency'
import { AccountCircle, Add } from '@mui/icons-material'
import { Box, Button, Typography } from '@mui/material'
import Link from 'next/link'

const AgencyHeader = ({ agency }: { agency: Agency }) => {
	return (
		<header className='py-2'>
			<div className='container mx-auto'>
				<Box className='flex justify-between'>
					<Link href={`/agency/${agency.id}`}>
						<Button startIcon={<AccountCircle />} color='inherit' className=''>
							<Typography className='ml-2 normal-case'>
								{agency.name}
							</Typography>
						</Button>
					</Link>
					<Link href={`/agency/${agency.id}/freelancer/new`}>
						<Button startIcon=<Add /> color='inherit' variant='contained'>
							<Typography className='ml-2 normal-case'>
								Add Freelancer
							</Typography>
						</Button>
					</Link>
				</Box>
			</div>
		</header>
	)
}

export default AgencyHeader
