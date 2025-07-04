'use client'
import AgencyFreelancer from '@/components/Agency/AgencyFreelancer'
import { useGetAgencyFreelancers } from '@/hooks/useGetAgencyFreelancers'
import {
	Paper,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Typography,
} from '@mui/material'
const TABLE_HEADS = [
	'Username',
	'Jobs',
	'Matched',
	'Unmatched',
	'Applied',
	'enabled',
	'',
]

const FreelancersPage = () => {
	const { freelancers } = useGetAgencyFreelancers()
	return (
		<div className='container mx-auto'>
			<Typography variant='h4' className='font-bold my-6'>Freelancers</Typography>
			<Paper className='p-4'>
				<Table>
					<TableHead>
						<TableRow>
							{TABLE_HEADS.map((head, i) => (
								<TableCell key={i}>{head}</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{freelancers && <AgencyFreelancer freelancers={freelancers} />}
					</TableBody>
				</Table>
			</Paper>
		</div>
	)
}

export default FreelancersPage 