import { IUser } from '@/types/user.type'
import mongoose, { Document, Schema } from 'mongoose'

interface UserInterface extends Document, IUser {}

const userSchema = new Schema<UserInterface>(
	{
		uid: { type: String, required: true },
		username: { type: String, required: true },
		password: { type: String, required: true },
		agencyId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'agencies',
		},
		email: { type: String, required: true },
	},
	{ timestamps: true }
)

const User: mongoose.Model<UserInterface> =
	mongoose.models.users || mongoose.model('users', userSchema)

export default User
