'use client'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Loader, Plus } from 'lucide-react'
import React from 'react'
import { useTodos } from './utils/Todos.query'

export default function Todos() {
	const { data: todos, isLoading } = useTodos()

	return (
		<div className="flex-1 flex flex-col">
			<header className="flex items-center justify-between px-4 pt-4 pb-2">
				<h1 className="text-xl font-bold">Todos</h1>
				<Button>
					<Plus className="h-5 w-5 mr-1" />
					Add Todo
				</Button>
			</header>

			<div className="flex-1">
				<div className="max-w-2xl mx-auto">
					<h2 className="mb-4 font-semibold text-muted-foreground">Pending</h2>

					{isLoading ? (
						<div className="grid place-content-center p-20">
							<Loader className="h-5 w-5 animate-spin" />
						</div>
					) : (
						todos?.map((todo) => (
							<div key={todo.id} className="flex items-center gap-4 border-b py-2">
								<Checkbox />
								<p>{todo.title}</p>
							</div>
						))
					)}
				</div>
			</div>
		</div>
	)
}
