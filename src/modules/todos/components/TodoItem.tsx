import { Checkbox } from '@/components/ui/checkbox'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { IconButton } from '@/components/ui/iconbutton'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { ITodo } from '@/types/todos'
import { Ellipsis, Pencil, Trash2 } from 'lucide-react'
import { useDeleteTodo, useToggleTodo } from '../utils/Todos.query'
import { useState } from 'react'
import AddTodoForm from './AddTodoForm'

export default function TodoItem({ todo }: { todo: ITodo }) {
	const toggleTodoMutation = useToggleTodo()
	const deleteTodoMutation = useDeleteTodo()
	const isChecked = !!todo.is_completed
	const [isEditMode, setIsEditMode] = useState(false)

	function handleToggleTodo(isChecked: boolean) {
		toggleTodoMutation.mutate({
			todoId: todo.id,
			isCompleted: isChecked,
		})
	}

	function handleDeleteTodo(todoId: string) {
		deleteTodoMutation.mutate({
			todoId,
		})
	}

	if (isEditMode) {
		return <AddTodoForm closeForm={() => setIsEditMode(false)} isEdit todo={todo} />
	}

	return (
		<div key={todo.id} className="flex items-center gap-4 border-b py-2 group" onDoubleClick={() => setIsEditMode(true)}>
			<Checkbox id={todo.id} checked={isChecked} className="rounded-full" onCheckedChange={handleToggleTodo} />

			<div className="flex-1">
				<Label
					htmlFor={todo.id}
					className={cn('text-sm', {
						'line-through': isChecked,
					})}
				>
					{todo.title}
				</Label>
			</div>

			{todo?.is_completed ? null : (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<IconButton className="h-6 w-6">
							<Ellipsis className="h-4 w-4" />
						</IconButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuItem className="text-xs" onClick={() => setIsEditMode(true)}>
							<Pencil strokeWidth={1.5} className="h-4 w-4 mr-2" />
							Edit
						</DropdownMenuItem>
						<DropdownMenuItem className="text-xs text-destructive focus:text-destructive" onClick={() => handleDeleteTodo(todo.id)}>
							<Trash2 strokeWidth={1.5} className="h-4 w-4 mr-2" />
							Delete
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			)}
		</div>
	)
}
