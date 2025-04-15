import { FirebaseApp, getApps, initializeApp } from 'firebase/app'
import { Auth, getAuth } from 'firebase/auth'

const firebaseConfig = {
	apiKey: 'apikey',
	authDomain: 'authdomain',
	projectId: 'projectid',
	appId: 'appid',
}

let app: FirebaseApp
if (!getApps().length) {
	app = initializeApp(firebaseConfig)
} else {
	app = getApps()[0]
}

const auth: Auth = getAuth(app)

export { auth }
