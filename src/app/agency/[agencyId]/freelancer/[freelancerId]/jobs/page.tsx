'use client'
import { useGetFreelancerJobs } from '@/hooks/queries/useGetFreelancersJobs'
import { Paper, Typography } from '@mui/material'

const JobsPage = () => {
	const { jobs, isLoading } = useGetFreelancerJobs()
	return (
		<div className='container'>
			{isLoading ? (
				<p>Loading...</p>
			) : (
				jobs &&
				jobs.length > 0 &&
				jobs.map(job => (
					<Paper
						key={`${job._id}`}
						className='p-4 break-words my-10'
						style={{ overflowWrap: 'anywhere' }}
					>
						<Typography variant='h6'>{job.title}</Typography>
						<Typography variant='body1'>{job.description}</Typography>
						{job.budget > 0 && (
							<Typography variant='body2' color='textSecondary'>
								{job.budget}$
							</Typography>
						)}
						<Typography variant='body2' color='textSecondary'>
							status : {job.status}
						</Typography>
						<Typography variant='body2' color='textSecondary'>
							GPT reason : {job.reason}
						</Typography>
					</Paper>
				))
			)}
		</div>
	)
}

export default JobsPage
