import { Button } from '@/components/ui/button'
import Modal from '@/components/widgets/Modal'
import { Loader } from 'lucide-react'
import { useClearTodos } from '../utils/Todos.query'

export default function ClearTodosModal({ open, onClose }: { open: boolean; onClose: () => void }) {
	const { mutate: clearTodos, isPending } = useClearTodos()

	function handleClear() {
		clearTodos(null, {
			onSuccess: () => {
				onClose()
			},
		})
	}

	return (
		<Modal open={open} onClose={onClose}>
			<Modal.Header title="Clear Completed Todos"></Modal.Header>

			<p>Are you sure you want to clear all the todos? This action is irreversible.</p>

			<Modal.Footer>
				<Button type="reset" variant="ghost" onClick={onClose} disabled={isPending}>
					Cancel
				</Button>
				<Button type="button" onClick={handleClear} disabled={isPending}>
					{isPending ? <Loader className=" h-4 w-4 mr-2 animate-spin" /> : null}
					Confirm
				</Button>
			</Modal.Footer>
		</Modal>
	)
}
