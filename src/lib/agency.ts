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
	_id: string
	id: string
	name: string
	freelancers: AgencyFreelancer[]
}
