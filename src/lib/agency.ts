import { IFreelancer } from '@/models/freelancer.model'
import { Document } from 'mongoose'
export type AgencyFreelancer = Omit<
	IFreelancer,
	| keyof Document
	| 'email'
	| 'job_preferences'
	| 'profile_description'
	| 'preferred_locations'
	| 'search_criteries'
> & { id: string }
export interface Agency {
	id: string
	name: string
	freelancers: AgencyFreelancer[]
}

export const agency: Agency = {
	id: 'testing',
	name: 'Testing Agency',
	freelancers: [
		{
			id: '67dd2ac1d20354bbf47db489',
			username: 'Vage Budanovs',
		},
		{
			id: '67c58cf582808a8dbd7e8b38',
			username: 'Erik Buddanov',
		},
	],
}
