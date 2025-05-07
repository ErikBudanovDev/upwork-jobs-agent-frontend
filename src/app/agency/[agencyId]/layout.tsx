import AgencyHeader from '@/components/Agency/AgencyHeader'
import React from 'react'

const layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
	return (
		<>
			<AgencyHeader />
			<main className='flex-[1]'>
				<div className='container mx-auto'>{children}</div>
			</main>
		</>
	)
}

export default layout
