import { Checkbox } from '@/components/ui/checkbox'
import { IconButton } from '@/components/ui/iconbutton'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { ITodo } from '@/types/todos'
import { Ellipsis } from 'lucide-react'
import { useToggleTodo } from '../utils/Todos.query'

export default function TodoItem({ todo }: { todo: ITodo }) {
	const toggleTodoMutation = useToggleTodo()
	const isChecked = !!todo.is_completed

	function handleToggleTodo(isChecked: boolean) {
		toggleTodoMutation.mutate({
			todoId: todo.id,
			isCompleted: isChecked,
		})
	}

	return (
		<div key={todo.id} className="flex items-center gap-4 border-b py-2">
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

			<IconButton className="h-6 w-6">
				<Ellipsis className="h-4 w-4" />
			</IconButton>
		</div>
	)
}
