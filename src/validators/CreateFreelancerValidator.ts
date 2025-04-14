export class CustomErrors extends Error {
	errors: { field: string; message: string }[] = []
	constructor(message: string, errors: { field: string; message: string }[]) {
		super(message)
		this.name = 'New Freelancer Validation error'
		this.errors = errors
	}

	toJSON() {
		return {
			name: this.name,
			message: this.message,
			errors: this.errors,
			status: 404,
		}
	}
}
