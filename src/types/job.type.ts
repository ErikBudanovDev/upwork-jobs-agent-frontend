import { IFreelancer } from '@/models/freelancer.model'
import { Document, Types } from 'mongoose'
export interface IJob extends Document {
	job_Id: string
	title: string
	description: string
	freelancer: IFreelancer | Types.ObjectId
	freelancer_id: string
	budget: number
	createdDateTime: Date
	ciphertext: string
	status: JobStatus
	reason: string
}
export type JobFromAPI = Omit<IJob, 'status' | 'freelancer'>
export enum JobStatus {
	pending = 'PENDING',
	true = 'TRUE',
	false = 'FALSE',
	ongoing = 'ONGOING',
}
