'use client'
import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react'
import { createClient } from './supabase/client'
import { User } from '@supabase/supabase-js'

interface IAuthContext {
	user: User
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState(null)
	const supabase = createClient()

	useEffect(() => {
		const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
			setUser(session?.user ?? null)
		})

		return () => {
			authListener.subscription.unsubscribe()
		}
	}, [])

	return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
	return useContext(AuthContext)
}
