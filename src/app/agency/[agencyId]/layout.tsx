import AgencyHeader from '@/components/Agency/AgencyHeader'
import { agency } from '@/lib/agency'
import React from 'react'

const layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
	return (
		<>
			<AgencyHeader agency={agency} />
			<main className='flex-[1]'>{children}</main>
		</>
	)
}

export default layout
