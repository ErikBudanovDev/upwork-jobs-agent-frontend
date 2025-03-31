import { Agency } from '@/lib/agency'
import { AccountCircle } from '@mui/icons-material'
import { Box, Button, Typography } from '@mui/material'

const AgencyHeader = ({ agency }: { agency: Agency }) => {
	return (
		<header className='py-2'>
			<div className='container mx-auto'>
				<Box>
					<Button startIcon={<AccountCircle />} color='inherit' className=''>
						<Typography className='ml-2 normal-case'> {agency.name}</Typography>
					</Button>
				</Box>
			</div>
		</header>
	)
}

export default AgencyHeader
