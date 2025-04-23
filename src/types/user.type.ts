import { AgencyDocument } from '@/models/agency.model'

export interface IUser {
	uid: string
	agencyId: AgencyDocument
	username: string
	password: string
	email: string
}

export interface loginForm {
	email: string
	password: string
	isLogin: boolean
}
