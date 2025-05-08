import { useUser } from '@/contexts/UserContext'
import { Notifications, Telegram } from '@mui/icons-material'
import { Box, Button, IconButton } from '@mui/material'
import Link from 'next/link'
import { useState } from 'react'
import ConfigureEmail from './ConfigureEmail'
import ConnectSlackButton from './ConnectSlack'

const NotificationSettings = () => {
	const [popActive, setPopActive] = useState(false)
	const user = useUser()
	return (
		<>
			<IconButton onClick={() => setPopActive(!popActive)}>
				<Notifications />
			</IconButton>
			<div
				onClick={e =>
					(e.target as HTMLDivElement).id === 'notificationPopup' &&
					setPopActive(false)
				}
				id='notificationPopup'
				className={`fixed z-10 inset-0 bg-gray-600/30 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center transition-all duration-300 transform ${
					popActive
						? 'opacity-100 scale-100 pointer-events-auto'
						: 'opacity-0 scale-[-3%] pointer-events-none'
				}`}
			>
				<div
					className='bg-white w-1/3 h-1/2 rounded-lg shadow-lg 
				flex flex-col justify-center items-center gap-y-4'
				>
					<Box className='flex gap-4'>
						<ConfigureEmail />
					</Box>
					<Box className='flex gap-4'>
						<Button
							startIcon={<Telegram />}
							variant='outlined'
							color='inherit'
							className='normal-case'
						>
							{!user.user?.telegramChatId ? (
								<Link
									target='_blank'
									className='normal-case'
									href={`https://t.me/UpworkJobReminder_bot?start=${user.user?.uid}`}
								>
									Add to Telegram
								</Link>
							) : (
								'Telegram Connected'
							)}
						</Button>
					</Box>
					<Box className='flex gap-4'>
						<ConnectSlackButton />
					</Box>
				</div>
			</div>
		</>
	)
}

export default NotificationSettings
