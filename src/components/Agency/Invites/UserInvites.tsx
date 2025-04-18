import { useAnswerInvite } from '@/hooks/useAcceptInvite'
import { InviteDocument } from '@/models/invite.model'
import { Check, Close } from '@mui/icons-material'
import { Box, Container, IconButton, Paper, Typography } from '@mui/material'

const UserInvites = ({ invites }: { invites: InviteDocument[] }) => {
	const { answerInvite, isPending } = useAnswerInvite()
	const handleAccept = (id: string) => {
		answerInvite({ id, answer: true })
	}
	const handleDecline = (id: string) => {
		answerInvite({ id, answer: false })
	}
	return (
		<Container>
			<Paper className='p-4'>
				<Typography variant='h4' color='initial' textAlign={'center'}>
					Invites
				</Typography>
				<Box>
					{invites.map((invite, i) => (
						<div key={i} className='flex justify-between'>
							<span>from: {invite.from}</span>
							<div>
								<IconButton
									disabled={isPending}
									onClick={() => handleAccept(invite._id as string)}
								>
									<Check color='success' />
								</IconButton>
								<IconButton
									onClick={() => handleDecline(invite._id as string)}
									disabled={isPending}
								>
									<Close color='error' />
								</IconButton>
							</div>
						</div>
					))}
				</Box>
			</Paper>
		</Container>
	)
}

export default UserInvites
