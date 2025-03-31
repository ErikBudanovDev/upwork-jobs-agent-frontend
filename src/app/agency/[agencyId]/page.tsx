'use client'

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
import { useState } from 'react'
const TABLE_HEADS = ['Username', 'Jobs', 'Matched', 'Unmatched', 'enabled']

const AgencyPage = () => {
	const freeLancers = agency.freelancers

	const [isLoading, setIsLoading] = useState(true)
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
						{isLoading && (
							<TableRow>
								<TableCell colSpan={TABLE_HEADS.length}>
									<>Loading...</>
								</TableCell>
							</TableRow>
						)}
						{freeLancers.map((freelancer, i) => (
							<AgencyFreelancer
								dataLoaded={isLoading}
								key={freelancer.id}
								endLoading={
									i === freeLancers.length - 1
										? () => setIsLoading(false)
										: undefined
								}
								freelancer={freelancer}
							/>
						))}
					</TableBody>
				</Table>
			</Paper>
		</div>
	)
}

export default AgencyPage
