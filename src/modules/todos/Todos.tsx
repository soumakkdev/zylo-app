'use client'
import { Loader, Plus } from 'lucide-react'
import { useState } from 'react'
import AddTodoForm from './components/AddTodoForm'
import TodoItem from './components/TodoItem'
import { useTodos } from './utils/Todos.query'

export default function Todos() {
	const { data: todos, isLoading } = useTodos()
	const [isAddTask, setIsAddTask] = useState(false)

	return (
		<div className="flex-1 flex flex-col">
			<div className="h-full py-6">
				<div className="max-w-3xl mx-auto">
					<h1 className="text-xl font-bold mb-2">Todos</h1>

					{isLoading ? (
						<div className="grid place-content-center p-20">
							<Loader className="h-5 w-5 animate-spin" />
						</div>
					) : (
						<>
							<div>
								<h3 className="mb-4 font-semibold text-muted-foreground">Pending</h3>
								{todos
									?.filter((todo) => !todo.is_completed)
									?.map((todo) => (
										<TodoItem key={todo.id} todo={todo} />
									))}
								{isAddTask ? (
									<AddTodoForm closeForm={() => setIsAddTask(false)} />
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

							<div className="my-8">
								<h3 className="mb-4 font-semibold text-muted-foreground">Completed</h3>
								{todos
									?.filter((todo) => todo.is_completed)
									?.map((todo) => (
										<TodoItem key={todo.id} todo={todo} />
									))}
							</div>
						</>
					)}
				</div>
			</div>
		</div>
	)
}
