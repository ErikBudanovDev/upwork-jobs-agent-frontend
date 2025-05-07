import { useCreateInvite } from '@/hooks/useCreateInvite'
import { useGetMembers } from '@/hooks/useGetMembers'
import { Group, PersonAdd } from '@mui/icons-material'
import { Container, IconButton, Input, Paper } from '@mui/material'
import { FormEvent, useState } from 'react'

const Invite = () => {
	const [openPop, setOpenPop] = useState<boolean>(false)
	const { members } = useGetMembers()
	const [inviteMember, setInviteMember] = useState('')
	const { createInvite, isPending } = useCreateInvite()
	const handleInvite = (e: FormEvent) => {
		e.preventDefault()
		createInvite(inviteMember)
		setInviteMember('')
	}
	return (
		<>
			<IconButton onClick={() => setOpenPop(prev => !prev)}>
				<Group />
			</IconButton>
			<div
				id='popupWrapper'
				onClick={e => {
					if (
						e.target instanceof HTMLElement &&
						e.target.id === 'popupWrapper'
					) {
						setOpenPop(false)
					}
				}}
				className={`fixed inset-0 bg-black/10 z-10 transition-all flex flex-col justify-center ${
					openPop
						? 'pointer-events-auto opacity-100'
						: 'opacity-0 pointer-events-none'
				}`}
			>
				<Container>
					<Paper className='bg-white'>
						<div className='my-6 p-4 '>
							<form onSubmit={handleInvite} className='flex items-center gap-2'>
								<Input
									fullWidth
									placeholder='Invite member via Email'
									onChange={e => setInviteMember(e.target.value)}
									value={inviteMember}
								/>
								<IconButton disabled={isPending}>
									<PersonAdd />
								</IconButton>
							</form>
						</div>
						{members &&
							members.map(member => (
								<div className='p-4' key={member.username}>
									<span>{member.username} </span>
									<span>{member.email} </span>
								</div>
							))}
					</Paper>
				</Container>
			</div>
		</>
	)
}

export default Invite
