import { initializeApp } from 'firebase/app'
import { Auth, getAuth } from 'firebase/auth'
const firebaseConfig = {
	apiKey: 'AIzaSyBreuMTK3VkkDcgeCiybMkaHDw4XooMCPc',
	authDomain: 'freelancers-app.firebaseapp.com',
	projectId: 'freelancers-app',
	storageBucket: 'freelancers-app.firebasestorage.app',
	messagingSenderId: '32344519159',
	appId: '1:32344519159:web:c1970963ab63d70c5abef2',
	measurementId: 'G-121DYD1KBB',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth: Auth = getAuth(app)

export { auth }
