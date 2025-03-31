import AgencyFreelancer from '@/components/Agency/AgencyFreelancer'
import { agency } from '@/lib/agency'
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
	const freeLancers = agency.freelancers

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
						<AgencyFreelancer freelancers={freeLancers} />
					</TableBody>
				</Table>
			</Paper>
		</div>
	)
}

export default AgencyPage
