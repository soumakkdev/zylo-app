import { createClient } from '@/lib/supabase/server'
import { IProject } from '@/types/project'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function Home() {
	const supabase = createClient()

	const {
		data: { user },
	} = await supabase.auth.getUser()

	const { data: projects } = await supabase.from('projects').select('*')

	if (!user) {
		return redirect('/login')
	}

	return (
		<main className="h-full container">
			<div className="flex py-3">
				<span>Zylo</span>
			</div>

			<h1>Projects</h1>
			{projects?.map((project: IProject) => {
				return (
					<Link href={`/project/${project.id}/tasks`} key={project.id}>
						{project.name}
					</Link>
				)
			})}
		</main>
	)
}
