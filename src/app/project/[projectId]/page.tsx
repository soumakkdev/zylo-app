import { createClient } from '@/lib/supabase/server'
import SideNav from '@/modules/layout/SideNav'
import { redirect } from 'next/navigation'
import React from 'react'

export default async function ProjectPage() {
	const supabase = createClient()

	const {
		data: { user },
	} = await supabase.auth.getUser()

	if (!user) {
		return redirect('/login')
	}

	return <div className="h-full flex">hi </div>
}
