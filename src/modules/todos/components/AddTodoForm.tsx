import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { useAuth } from '@/lib/AuthProvider'
import { ITodo } from '@/types/todos'
import { useForm } from '@tanstack/react-form'
import { Loader } from 'lucide-react'
import { isEmpty } from 'radash'
import { useSaveTodo } from '../utils/Todos.query'

export default function AddTodoForm({ closeForm, isEdit, todo }: { isEdit?: boolean; todo?: ITodo; closeForm: () => void }) {
	const { mutate: saveTodo, isPending } = useSaveTodo()
	const { user } = useAuth()

	const form = useForm({
		defaultValues: {
			title: isEdit ? todo.title : '',
		},
		onSubmit: async ({ value }) => {
			saveTodo(
				{
					isEdit,
					todoId: todo?.id ?? null,
					title: value.title,
					userId: user?.id,
				},
				{
					onSettled: () => {
						form.reset()
						if (isEdit) {
							closeForm()
						}
					},
				}
			)
		},
	})

	return (
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
				<Button size="sm" variant="ghost" className="h-7" type="button" onClick={closeForm} disabled={isPending}>
					Cancel
				</Button>
				<Button size="sm" variant="default" className="h-7" disabled={isPending}>
					{isPending ? <Loader className="h-4 w-4 animate-spin mr-1" /> : null} {isEdit ? 'Save' : 'Add'}
				</Button>
			</div>
		</form>
	)
}
