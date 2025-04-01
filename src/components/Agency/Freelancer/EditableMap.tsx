import { IFreelancer } from '@/models/freelancer.model'
import { Add, Remove } from '@mui/icons-material'
import { IconButton, Input, Typography } from '@mui/material'
import { useState } from 'react'

const EditableMap = ({
	initialMap,
	title,
	updateFreelancer,
}: {
	initialMap: Record<string, string>
	title: string
	updateFreelancer: (updatedData: Partial<IFreelancer>) => void
}) => {
	const [map, setMap] = useState(initialMap)

	const handleChange = (key: string, value: string) => {
		setMap(prev => ({
			...prev,
			[key]: value,
		}))

		updateFreelancer({ search_criteries: map })
	}

	return (
		<div>
			<Typography variant='h5' component='h2'>
				{title}
			</Typography>
			<ul className='mt-4 flex flex-wrap'>
				{Object.entries(map).map(([key, value]) => (
					<li key={key} className='flex items-center gap-x-2 flex-[0_0_25%]'>
						<span>{key}.</span>
						<Input
							fullWidth
							value={value}
							onChange={e => handleChange(key, e.currentTarget.value)}
							onBlur={e => handleChange(key, e.currentTarget.value)}
							onKeyDown={e =>
								e.key === 'Enter' && handleChange(key, e.currentTarget.value)
							}
						/>
						<IconButton>
							<Add />
						</IconButton>
						<IconButton>
							<Remove />
						</IconButton>
					</li>
				))}
			</ul>
		</div>
	)
}

export default EditableMap
