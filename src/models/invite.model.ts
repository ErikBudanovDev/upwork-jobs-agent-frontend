import { IInvite } from '@/types/invite.type'
import mongoose, { Document, Model, Schema } from 'mongoose'

export interface InviteDocument extends IInvite, Document {}

const inviteSchema = new Schema<InviteDocument>({
	from: { type: String, required: true },
	to: { type: String, required: true },
})

const Invite: Model<IInvite> =
	mongoose.models.invites || mongoose.model('invites', inviteSchema)

export default Invite
