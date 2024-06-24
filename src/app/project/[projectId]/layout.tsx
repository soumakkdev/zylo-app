import { createClient } from '@/lib/supabase/server'
import SideNav from '@/modules/layout/SideNav'
import { redirect } from 'next/navigation'
import { isEmpty } from 'radash'
import { ReactNode } from 'react'

export default async function ProjectLayout({ children, params }: { children: ReactNode; params?: any }) {
	const supabase = createClient()
	const projectId = params?.projectId as string

	const {
		data: { user },
	} = await supabase.auth.getUser()

	if (!user) {
		return redirect('/login')
	}
	const { data: projects } = await supabase.from('projects').select('*').eq('id', projectId)

	if (isEmpty(projects)) {
		return <p>{`Sorry, don't have permission to this project`}</p>
	}

	return (
		<div className="h-full flex">
			<SideNav user={user} />
			{children}
		</div>
	)
}
