'use client'
import { auth } from '@/lib/firebase'
import authService from '@/services/AuthService'
import { IUser } from '@/types/user.type'
import { onAuthStateChanged } from 'firebase/auth'
import React, { createContext, useContext, useEffect, useState } from 'react'

interface UserContextType {
	user: IUser | null
	loading: boolean
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider = ({
	children,
}: Readonly<{ children: React.ReactNode }>) => {
	const [user, setUser] = useState<IUser | null>(null)
	const [loading, setLoading] = useState<boolean>(true)

	useEffect(() => {
		const getAuthUser = async (token: string) => {
			await authService.setToken(token)

			const user = await authService.getCurrentUser()
			return user
		}
		const unsubscribe = onAuthStateChanged(auth, async firebaseUser => {
			if (firebaseUser) {
				setUser(await getAuthUser(await firebaseUser.getIdToken()))
			}
			setLoading(false)
		})
		return () => unsubscribe()
	}, [])

	return (
		<UserContext.Provider value={{ user, loading }}>
			{children}
		</UserContext.Provider>
	)
}

export const useUser = () => {
	const context = useContext(UserContext)
	if (!context) {
		throw new Error('useUser must be used within a UserProvider')
	}
	return context
}
