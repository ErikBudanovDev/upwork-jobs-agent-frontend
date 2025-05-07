import { IAgency } from '@/types/agency.type'
import { Document, Schema, model, models } from 'mongoose'

export interface AgencyDocument extends Document, IAgency {}

const agencySchema = new Schema<AgencyDocument>({
	name: { type: String, required: true },
})

const Agency =
	models.agencies || model<AgencyDocument>('agencies', agencySchema)

export default Agency
