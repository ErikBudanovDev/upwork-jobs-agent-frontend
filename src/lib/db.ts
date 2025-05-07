import mongoose from 'mongoose'

const connectDb = async () => {
	if (mongoose && mongoose.connection && mongoose.connections[0].readyState) {
		return
	}

	try {
		if (typeof window === 'undefined') {
			await mongoose.connect(process.env.MONGO_URI as string)
		}
		console.log('MongoDB connected')
	} catch (error) {
		console.log('Error connecting to MongoDB', error)
		throw new Error('failed to connect to Mongodb')
	}
}

export default connectDb
