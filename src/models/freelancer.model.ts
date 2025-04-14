import mongoose, { Document, Schema } from 'mongoose'

export interface FreelancerType {
	email: string
	job_preferences: string
	profile_description: string
	search_criteries: Record<string, string>
	username: string
	preferred_locations: Record<string, string>
}

export interface IFreelancer extends Document, FreelancerType {}

const freelancerSchema = new Schema<IFreelancer>({
	email: { type: String, required: true },
	job_preferences: { type: String, required: true },
	profile_description: { type: String, required: true },
	search_criteries: {
		type: Object,
		of: String,
		required: true,
	},
	username: { type: String, required: true },
	preferred_locations: {
		type: Object,
		of: String,
		required: true,
	},
})
const Freelancer: mongoose.Model<IFreelancer> =
	mongoose.models.freelancers ||
	mongoose.model<IFreelancer>('freelancers', freelancerSchema)

export default Freelancer
