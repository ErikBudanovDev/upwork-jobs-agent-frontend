import mongoose, { Schema } from 'mongoose'
import { IJob, JobStatus } from '../types/job.type'

const jobSchema = new Schema<IJob>({
	job_Id: { type: 'string', required: true },
	title: { type: 'string', required: true },
	description: { type: 'string', required: true },
	budget: { type: 'Number' },
	createdDateTime: { type: 'Date' },
	status: { type: 'String', default: JobStatus.pending },
	freelancer_id: { type: 'string', required: true },
	ciphertext: { type: 'string' },
	freelancer: {
		type: Schema.Types.ObjectId,
		ref: 'freelancers',
	},
	reason: { type: 'string' },
})

jobSchema.index({ freelancer_id: 1 })
const Job: mongoose.Model<IJob> =
	mongoose.models.jobs || mongoose.model<IJob>('jobs', jobSchema)

export default Job
