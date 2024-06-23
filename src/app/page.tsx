import { createClient } from '@/lib/supabase/server'
import SideNav from '@/modules/layout/SideNav'
import { redirect } from 'next/navigation'

export default async function Home() {
	const supabase = createClient()

	const {
		data: { user },
	} = await supabase.auth.getUser()

	if (!user) {
		return redirect('/login')
	}

	return (
		<main className="h-full flex">
			<SideNav user={user} />
		</main>
	)
}
