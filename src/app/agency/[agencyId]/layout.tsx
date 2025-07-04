'use client'

import AgencyHeader from '@/components/Agency/AgencyHeader'
import NotificationSettings from '@/components/Agency/Notifications/Notification'
import Invite from '@/components/Agency/Invites/Invite'
import LogOut from '@/components/auth/LogOut'
import { Add, Notifications, Group, Dashboard as DashboardIcon, People as PeopleIcon } from '@mui/icons-material'
import Link from 'next/link'
import { Button, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useParams, usePathname, useRouter } from 'next/navigation'

const layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
	const { agencyId } = useParams<{ agencyId: string }>()
	const [showNotification, setShowNotification] = useState(false)
	const [showInvite, setShowInvite] = useState(false)
	const pathname = usePathname()
	const router = useRouter()

	useEffect(() => {
		if (pathname === `/agency/${agencyId}`) {
			router.replace(`/agency/${agencyId}/dashboard`)
		}
	}, [pathname, agencyId, router])

	return (
		<div className="flex min-h-screen">
			{/* Sidebar */}
			<aside className="w-64 bg-white shadow-lg flex flex-col gap-4 p-6">
				<Link href={`/agency/${agencyId}/dashboard`}>
					<Button startIcon={<DashboardIcon />} className="w-full bg-primary text-white border border-primary hover:bg-primary/90">
						Dashboard
					</Button>
				</Link>
				<Link href={`/agency/${agencyId}/freelancers`}>
					<Button startIcon={<PeopleIcon />} className="w-full bg-primary text-white border border-primary hover:bg-primary/90">
						Freelancers
					</Button>
				</Link>
				<Button
					startIcon={<Notifications />}
					className="w-full bg-primary text-white border border-primary hover:bg-primary/90"
					onClick={() => setShowNotification(v => !v)}
				>
					Notification
				</Button>
				{showNotification && <NotificationSettings />}
				<Button
					startIcon={<Group />}
					className="w-full bg-primary text-white border border-primary hover:bg-primary/90"
					onClick={() => setShowInvite(v => !v)}
				>
					Invite a member
				</Button>
				{showInvite && <Invite />}
				<Link href={`/agency/${agencyId}/freelancer/new`}>
					<Button startIcon={<Add />} className="w-full bg-primary text-white border border-primary hover:bg-primary/90">
						<Typography className="ml-2 normal-case">Add Freelancer</Typography>
					</Button>
				</Link>
				<LogOut />
			</aside>
			<div className="flex-1 flex flex-col">
				<AgencyHeader />
				<main className="flex-1">
					<div className="container mx-auto">{children}</div>
				</main>
			</div>
		</div>
	)
}

export default layout
