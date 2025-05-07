import { IFreelancer } from '@/models/freelancer.model'
import { Add, Remove } from '@mui/icons-material'
import { IconButton, Input, Typography } from '@mui/material'
import { KeyboardEvent, useEffect, useState } from 'react'

const EditableMap = ({
	initialMap,
	title,
	updateFreelancer,
	keyName,
}: {
	initialMap: Record<string, string>
	title: string
	updateFreelancer: (updatedData: Partial<IFreelancer>) => void
	keyName: string
}) => {
	const [map, setMap] = useState(initialMap)
	const handleChange = (key: string, value: string) => {
		setMap(prev => ({
			...prev,
			[key]: value,
		}))
	}
	useEffect(() => {
		const newObj: { [key: string]: Partial<IFreelancer> } = {}
		newObj[keyName] = Object.entries(map)
			.filter(([, value]) => value.trim() !== '') // Убираем пустые строки
			.reduce((acc, [key, value]) => {
				acc[key] = value
				return acc
			}, {} as { [key: string]: string })

		updateFreelancer(newObj)
	}, [map])
	const handleAdd = (value: string) => {
		setMap(prevMap => {
			const entries = Object.values(prevMap)
			const index = entries.findIndex(item => item === value)
			if (index !== -1) {
				entries.splice(index + 1, 0, '')
			} else {
				entries.push('')
			}
			const newMap = Object.fromEntries(
				entries.map((item, index) => [index + 1, item])
			)
			return newMap
		})
	}
	const handleRemove = (key: string) => {
		setMap(prev => {
			const newMap = { ...prev }
			delete newMap[key]
			return newMap
		})
	}
	return (
		<div>
			<Typography variant='h5' component='h2'>
				{title}
			</Typography>
			<ul className='mt-4 flex flex-wrap'>
				{Object.entries(map).map(([key, value], i) => (
					<li
						key={`${value}-${i}`}
						className='flex items-center gap-x-2 flex-[0_0_25%]'
					>
						<span>{key}.</span>
						<Input
							fullWidth
							defaultValue={value}
							onBlur={e => {
								handleChange(key, e.target.value)
							}}
							onKeyDown={(e: KeyboardEvent<HTMLInputElement>) =>
								e.key === 'Enter' && handleChange(key, e.currentTarget.value)
							}
						/>
						<IconButton onClick={() => handleAdd(value)}>
							<Add />
						</IconButton>
						<IconButton onClick={() => handleRemove(key)}>
							<Remove />
						</IconButton>
					</li>
				))}
			</ul>
		</div>
	)
}

export default EditableMap
