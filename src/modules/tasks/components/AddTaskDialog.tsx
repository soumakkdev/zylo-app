import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import Modal from '@/components/widgets/Modal'
import Select from '@/components/widgets/Select'
import { useForm } from '@tanstack/react-form'
import React from 'react'
import { PriorityOptions } from '../helpers/Tasks.utils'
import { IAddTaskBody, IStatus } from '@/types/tasks'
import { DatePicker } from '@/components/widgets/DatePicker'
import { useAddTask } from '../helpers/Tasks.query'

export default function AddTaskDialog({ open, onClose, statusList }: { open: boolean; onClose: () => void; statusList: IStatus[] }) {
	const addTaskMutation = useAddTask()

	const form = useForm({
		defaultValues: {
			title: '',
			description: '',
			priority: '',
			status: '',
			date: '',
		},
		onSubmit: async ({ value }) => {
			const reqBody: IAddTaskBody = {
				date: value.date,
				priority: value.priority,
				title: value.title,
				description: value?.description ?? null,
				status_id: parseInt(value?.status),
			}
			addTaskMutation.mutate(reqBody, {
				onSettled: () => {
					onClose()
				},
			})
		},
	})

	const statusOptions = statusList?.map((status) => ({
		label: status.name,
		value: status.id.toString(),
	}))

	return (
		<Modal open={open} onClose={onClose}>
			<Modal.Header title="Add Task"></Modal.Header>

			<form
				onSubmit={(e) => {
					e.preventDefault()
					e.stopPropagation()
					void form.handleSubmit()
				}}
				className="space-y-4"
			>
				<form.Field name="title">
					{(field) => (
						<div className="space-y-1">
							<Label htmlFor={field.name}>Title</Label>
							<Input
								id={field.name}
								name={field.name}
								value={field.state.value}
								onBlur={field.handleBlur}
								onChange={(e) => field.handleChange(e.target.value)}
							/>
						</div>
					)}
				</form.Field>

				<form.Field name="description">
					{(field) => (
						<div className="space-y-1">
							<Label htmlFor={field.name}>Description</Label>
							<Textarea
								rows={3}
								id={field.name}
								name={field.name}
								value={field.state.value}
								onBlur={field.handleBlur}
								onChange={(e) => field.handleChange(e.target.value)}
							/>
						</div>
					)}
				</form.Field>

				<form.Field name="priority">
					{(field) => (
						<div className="space-y-1">
							<Label htmlFor={field.name}>Priority</Label>
							<Select id={field.name} value={field.state.value} onChange={(value) => field.handleChange(value)} options={PriorityOptions} />
						</div>
					)}
				</form.Field>

				<form.Field name="status">
					{(field) => (
						<div className="space-y-1">
							<Label htmlFor={field.name}>Status</Label>
							<Select id={field.name} value={field.state.value} onChange={(value) => field.handleChange(value)} options={statusOptions} />
						</div>
					)}
				</form.Field>

				<form.Field name="date">
					{(field) => (
						<div className="space-y-1">
							<Label htmlFor={field.name}>Date</Label>
							<DatePicker id={field.name} value={field.state.value} onChange={(value) => field.handleChange(value)} />
						</div>
					)}
				</form.Field>

				<Modal.Footer>
					<Button type="reset" variant="ghost" disabled={addTaskMutation.isPending} onClick={onClose}>
						Cancel
					</Button>
					<Button type="submit" disabled={addTaskMutation.isPending}>
						Submit
					</Button>
				</Modal.Footer>
			</form>
		</Modal>
	)
}
