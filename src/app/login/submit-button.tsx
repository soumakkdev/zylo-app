'use client'

import { useFormStatus } from 'react-dom'
import { type ComponentProps } from 'react'
import { Button } from '@/components/ui/button'
import { Loader } from 'lucide-react'

type Props = ComponentProps<'button'> & {}

export function SubmitButton({ children, ...props }: Props) {
	const { pending, action } = useFormStatus()

	const isPending = pending && action === props.formAction

	return (
		<Button {...props} type="submit" aria-disabled={pending}>
			{isPending ? <Loader className="h-4 w-4 animate-spin" /> : children}
		</Button>
	)
}
