import mongoose, { Schema } from 'mongoose'
import { IJob, JobProposalStatus, JobStatus } from '../types/job.type'

const jobSchema = new Schema<IJob>({
	job_Id: { type: String, required: true },
	title: { type: String, required: true },
	description: { type: String, required: true },
	budget: { type: Number },
	createdDateTime: { type: Date },
	status: { type: String, default: JobStatus.pending },
	proposalStatus: { type: String, default: JobProposalStatus.pending },
	freelancer_id: { type: String, required: true },
	ciphertext: { type: String },
	freelancer: {
		type: Schema.Types.ObjectId,
		ref: 'freelancers',
	},
	reason: { type: String },
	notificationStatus: { type: Boolean, default: false },
	totalSpent: { type: String },
	totalHires: { type: Number },
	totalJobs: { type: Number },
	totalFeedback: { type: Number },
	totalInvites: { type: Number },
	totalApplicants: { type: Number },
	spendPerHire: { type: Number },
})

jobSchema.index({ freelancer_id: 1 })
const Job: mongoose.Model<IJob> =
	mongoose.models.jobs || mongoose.model<IJob>('jobs', jobSchema)

export default Job
