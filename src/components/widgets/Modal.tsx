import { ReactNode } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'

interface IModal {
	open: boolean
	onClose: () => void
	children: ReactNode
}

export default function Modal(props: IModal) {
	const { onClose, open, children } = props
	return (
		<Dialog open={open} onOpenChange={() => onClose()}>
			<DialogContent>{children}</DialogContent>
		</Dialog>
	)
}

function ModalHeader({ title, actions }: { title: string; actions?: ReactNode }) {
	return (
		<DialogHeader className="flex-row justify-between items-center mr-9">
			<DialogTitle>{title}</DialogTitle>

			{actions}
		</DialogHeader>
	)
}

Modal.Header = ModalHeader
Modal.Footer = DialogFooter
