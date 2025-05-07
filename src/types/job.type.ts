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
	proposalStatus: JobProposalStatus
	reason: string
	notificationStatus: boolean
	totalSpent: string
	totalHires: number
	totalJobs: number
	totalFeedback: number
	totalInvites: number
	totalApplicants: number
	spendPerHire: number
}
export type JobFromAPI = Omit<IJob, 'status' | 'freelancer'>
export enum JobStatus {
	pending = 'PENDING',
	true = 'TRUE',
	false = 'FALSE',
	ongoing = 'ONGOING',
}

export enum JobProposalStatus {
	pending = 'pending',
	sent = 'sent',
	applied = 'applied',
	rejected = 'rejected',
	viewed = 'viewed',
}
