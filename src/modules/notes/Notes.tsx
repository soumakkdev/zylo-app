'use client'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Loader, Plus } from 'lucide-react'
import NotesList from './list/NotesList'
import { useNotes } from './utils/Notes.query'

enum NotesTabs {
	All = 'all',
	Important = 'Important',
}

export default function Notes() {
	const { data: notes, isLoading } = useNotes()

	return (
		<div className="flex-1 flex flex-col">
			<header className="flex items-center justify-between px-4 pt-4 pb-2">
				<h1 className="text-xl font-bold">Notes</h1>
				<Button>
					<Plus className="h-5 w-5 mr-1" />
					Add Note
				</Button>
			</header>

			<Tabs defaultValue={NotesTabs.All} className="w-full px-4 flex-1 flex flex-col">
				<TabsList className="w-full justify-start">
					<TabsTrigger value={NotesTabs.All}>All</TabsTrigger>
					<TabsTrigger value={NotesTabs.Important}>Important</TabsTrigger>
				</TabsList>
				<TabsContent value={NotesTabs.All} className="flex-1">
					{isLoading ? (
						<div className="h-full w-full grid place-content-center">
							<Loader className="animate-spin h-5 w-5" />
						</div>
					) : (
						<NotesList notes={notes} />
					)}
				</TabsContent>
				<TabsContent value={NotesTabs.Important}></TabsContent>
			</Tabs>
		</div>
	)
}
