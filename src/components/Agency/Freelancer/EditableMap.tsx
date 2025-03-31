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
	updateFreelancer: () => void
}) => {
	const [map, setMap] = useState(initialMap)

	const handleChange = (key: string, value: string) => {
		setMap(prev => ({
			...prev,
			[key]: value,
		}))
		updateFreelancer()
	}

	const handleAdd = (index: number) => {
		const arr = Object.values(map)
		arr.splice(index, 0, '')

		const obj = Object.fromEntries(arr.map((value, idx) => [idx + 1, value]))
		setMap(obj)
	}

	return (
		<div>
			<Typography variant='h5' component='h2'>
				{title}
			</Typography>
			<ul className='mt-4'>
				{Object.entries(map).map(([key, value]) => (
					<li key={key} className='flex items-center gap-x-2'>
						<span>{key}.</span>
						<Input
							disabled={false}
							value={value} // Заменил defaultValue на value
							onChange={e => handleChange(key, e.currentTarget.value)}
							onBlur={e => handleChange(key, e.currentTarget.value)}
							onKeyDown={e =>
								e.key === 'Enter' && handleChange(key, e.currentTarget.value)
							}
						/>
						<IconButton onClick={() => handleAdd(+key)}>
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
