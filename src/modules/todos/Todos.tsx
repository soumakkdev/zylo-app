'use client'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { useAuth } from '@/lib/AuthProvider'
import { ICreateTodo } from '@/types/todos'
import { useForm } from '@tanstack/react-form'
import { Loader, Plus } from 'lucide-react'
import { isEmpty } from 'radash'
import { useState } from 'react'
import { useAddTodo, useTodos } from './utils/Todos.query'

export default function Todos() {
	const { data: todos, isLoading } = useTodos()
	const [isAddTask, setIsAddTask] = useState(false)
	const addTodoMutation = useAddTodo()
	const { user } = useAuth()

	const form = useForm({
		defaultValues: {
			title: '',
		},
		onSubmit: async ({ value }) => {
			const reqBody: ICreateTodo = {
				title: value.title,
				user_id: user?.id,
			}
			addTodoMutation.mutate(reqBody, {
				onSettled: () => {
					form.reset()
				},
			})
		},
	})

	function closeAddForm() {
		setIsAddTask(false)
	}

	return (
		<div className="flex-1 flex flex-col">
			<div className="h-full py-6">
				<div className="max-w-3xl mx-auto">
					<h1 className="text-xl font-bold mb-2">Todos</h1>
					<h3 className="mb-4 font-semibold text-muted-foreground">Pending</h3>

					{isLoading ? (
						<div className="grid place-content-center p-20">
							<Loader className="h-5 w-5 animate-spin" />
						</div>
					) : (
						<div>
							{todos?.map((todo) => (
								<div key={todo.id} className="flex items-center gap-4 border-b py-2">
									<Checkbox className="rounded-full" />
									<p className="text-sm">{todo.title}</p>
								</div>
							))}

							{isAddTask ? (
								<form
									onSubmit={(e) => {
										e.preventDefault()
										e.stopPropagation()
										void form.handleSubmit()
									}}
									className="flex items-center gap-4 border-b py-1.5"
								>
									<Checkbox className="rounded-full" disabled />

									<form.Field
										name="title"
										validators={{
											onSubmit: ({ value }: any) => {
												if (isEmpty(value)) return "Title can't be empty"
											},
										}}
									>
										{(field) => (
											<input
												placeholder="New Todo"
												autoFocus
												className="bg-transparent outline-none w-full text-sm"
												id={field.name}
												name={field.name}
												value={field.state.value}
												onBlur={field.handleBlur}
												onChange={(e) => field.handleChange(e.target.value)}
											/>
										)}
									</form.Field>

									<div className="flex gap-2">
										<Button
											size="sm"
											variant="ghost"
											className="h-7"
											type="button"
											onClick={closeAddForm}
											disabled={addTodoMutation.isPending}
										>
											Cancel
										</Button>
										<Button size="sm" variant="default" className="h-7" disabled={addTodoMutation.isPending}>
											{addTodoMutation.isPending ? <Loader className="h-4 w-4 animate-spin mr-1" /> : null} Save
										</Button>
									</div>
								</form>
							) : (
								<button
									onClick={() => setIsAddTask(true)}
									className="w-full flex items-center gap-2 hover:text-primary cursor-pointer py-2"
								>
									<Plus className="h-4 w-4" />
									<p className="text-sm">Add Task</p>
								</button>
							)}
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
