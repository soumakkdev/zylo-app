'use client'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuPortal,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { createClient } from '@/lib/supabase/client'
import { User } from '@supabase/supabase-js'
import { ClipboardList, ListTodo, Notebook, Search, User2 } from 'lucide-react'
import { useTheme } from 'next-themes'
import { usePathname, useRouter } from 'next/navigation'
import NavButton from './NavButton'

export default function SideNav({ user }: { user: User }) {
	const router = useRouter()
	const pathname = usePathname()
	const supabase = createClient()
	const { theme, setTheme } = useTheme()

	async function handleLogout() {
		await supabase.auth.signOut()
		window.location.reload()
	}

	return (
		<div className="w-14 border-r h-full py-4 flex flex-col">
			<div className="flex flex-col items-center gap-3 flex-1">
				<NavButton Icon={ClipboardList} isActive={pathname?.includes('tasks')} onClick={() => router.push(`/dashboard/tasks`)} />
				<NavButton Icon={Notebook} isActive={pathname?.includes('notes')} onClick={() => router.push(`/dashboard/notes`)} />
				<NavButton Icon={ListTodo} isActive={pathname?.includes('todos')} onClick={() => router.push(`/dashboard/todos`)} />
			</div>

			<div className="flex flex-col items-center gap-2">
				{/* <NavButton Icon={Search} /> */}
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<NavButton Icon={User2} />
					</DropdownMenuTrigger>
					<DropdownMenuContent align="start">
						<DropdownMenuLabel>
							<p className="text-xs text-muted-foreground font-normal">{user.email}</p>
						</DropdownMenuLabel>

						<DropdownMenuSeparator />

						<DropdownMenuSub>
							<DropdownMenuSubTrigger>
								<span className="text-xs">Theme</span>
							</DropdownMenuSubTrigger>
							<DropdownMenuPortal>
								<DropdownMenuSubContent>
									<DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
										<DropdownMenuRadioItem className="text-xs" value="system">
											System
										</DropdownMenuRadioItem>
										<DropdownMenuRadioItem className="text-xs" value="dark">
											Dark
										</DropdownMenuRadioItem>
										<DropdownMenuRadioItem className="text-xs" value="light">
											Light
										</DropdownMenuRadioItem>
									</DropdownMenuRadioGroup>
								</DropdownMenuSubContent>
							</DropdownMenuPortal>
						</DropdownMenuSub>

						<DropdownMenuItem className="text-xs" onClick={handleLogout}>
							Log out
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</div>
	)
}
