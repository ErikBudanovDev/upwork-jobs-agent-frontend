'use client'

import { Add, Remove } from '@mui/icons-material'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'

const CreateMapField = ({
	searchCriteries,
	setObjectValue,
}: {
	searchCriteries: string[]
	setObjectValue: (data: string[]) => void
}) => {
	const handleAddCriterion = () => {
		setObjectValue([...searchCriteries, ''])
	}
	const handleRemoveCriterion = (index: number) => {
		console.log(searchCriteries)
		if (searchCriteries.length <= 1) {
			setObjectValue([''])
		} else {
			const newCriteries = searchCriteries.filter((_, i) => i !== index)
			setObjectValue(newCriteries)
		}
	}

	return (
		<>
			{searchCriteries.map((criterion, index) => (
				<div key={index} className='flex items-center gap-x-2 mt-2'>
					<TextField
						value={criterion}
						rows={1}
						className='flex-1'
						onChange={e => {
							setObjectValue(
								searchCriteries.map((_, i) =>
									i === index ? e.target.value : _
								)
							)
						}}
					/>
					<IconButton onClick={handleAddCriterion}>
						<Add />
					</IconButton>
					<IconButton onClick={() => handleRemoveCriterion(index)}>
						<Remove />
					</IconButton>
				</div>
			))}
		</>
	)
}

export default CreateMapField
