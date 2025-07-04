import SignForm from '@/components/auth/SignForm'

const RegisterPage = () => {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen">
			<h1 className="text-3xl font-bold mb-6">Welcome to the Freelancers Hub</h1>
			<SignForm />
		</div>
	)
}

export default RegisterPage
