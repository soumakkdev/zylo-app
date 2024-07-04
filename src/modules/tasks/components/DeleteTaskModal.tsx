import { Button } from '@/components/ui/button'
import Modal from '@/components/widgets/Modal'
import { Loader } from 'lucide-react'
import { useDeleteTask } from '../helpers/Tasks.query'

export default function DeleteTaskModal({ open, onClose, taskId }: { open: boolean; onClose: () => void; taskId: string }) {
	const { mutate: deleteTask, isPending } = useDeleteTask()

	function handleDelete() {
		deleteTask(taskId, {
			onSuccess: (data, variables, context) => {
				onClose()
			},
		})
	}

	return (
		<Modal open={open} onClose={onClose}>
			<Modal.Header title="Delete Task"></Modal.Header>

			<p>Are you sure you want to delete this task? This action is irreversible and the task will not be restored.</p>

			<Modal.Footer>
				<Button type="reset" variant="ghost" onClick={onClose} disabled={isPending}>
					Cancel
				</Button>
				<Button type="button" onClick={handleDelete} disabled={isPending}>
					{isPending ? <Loader className=" h-4 w-4 mr-2 animate-spin" /> : null}
					Confirm
				</Button>
			</Modal.Footer>
		</Modal>
	)
}
