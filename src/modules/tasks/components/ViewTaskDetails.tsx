import Modal from '@/components/widgets/Modal'
import { ITask } from '@/types/tasks'
import { Pencil, Trash2 } from 'lucide-react'
import React, { useState } from 'react'
import DeleteTaskModal from './DeleteTaskModal'
import { IconButton } from '@/components/ui/iconbutton'

export default function ViewTaskDetails({ open, onClose, task }: { open: boolean; onClose: () => void; task: ITask }) {
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
	return (
		<Modal open={open} onClose={onClose}>
			<Modal.Header
				title={task.title}
				actions={
					<div className="flex items-center gap-1">
						<IconButton>
							<Pencil className="h-4 w-4" />
						</IconButton>
						<IconButton onClick={() => setIsDeleteModalOpen(true)}>
							<Trash2 className="h-4 w-4" />
						</IconButton>
					</div>
				}
			></Modal.Header>

			{isDeleteModalOpen ? (
				<DeleteTaskModal open={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} taskId={task.id.toString()} />
			) : null}

			<p>Priority: {task.priority}</p>
			<p>Status: {task.status.name}</p>
		</Modal>
	)
}
