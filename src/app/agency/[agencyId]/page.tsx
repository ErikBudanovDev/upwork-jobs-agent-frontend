'use client'
import AgencyFreelancer from '@/components/Agency/AgencyFreelancer'
import { useUser } from '@/contexts/UserContext'
import { useGetAgencyFreelancers } from '@/hooks/useGetAgencyFreelancers'
import {
	Paper,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
} from '@mui/material'
const TABLE_HEADS = ['Username', 'Jobs', 'Matched', 'Unmatched', 'enabled', '']

const AgencyPage = () => {
	const { user, loading } = useUser()
	const { freelancers } = useGetAgencyFreelancers()
	return (
		<div className='container mx-auto'>
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

export default AgencyPage
