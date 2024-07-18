import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { ICreateTodo } from '@/types/todos'
import { FormApi, useForm } from '@tanstack/react-form'
import { isEmpty } from 'radash'
import React from 'react'
import { useAddTodo } from '../utils/Todos.query'
import { useAuth } from '@/lib/AuthProvider'
import { Loader } from 'lucide-react'

export default function AddTodoForm({ closeForm }: { closeForm: () => void }) {
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
				<Button size="sm" variant="ghost" className="h-7" type="button" onClick={closeForm} disabled={addTodoMutation.isPending}>
					Cancel
				</Button>
				<Button size="sm" variant="default" className="h-7" disabled={addTodoMutation.isPending}>
					{addTodoMutation.isPending ? <Loader className="h-4 w-4 animate-spin mr-1" /> : null} Save
				</Button>
			</div>
		</form>
	)
}
