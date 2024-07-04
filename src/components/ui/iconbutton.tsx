import { cn } from '@/lib/utils'
import React, { ReactNode, forwardRef } from 'react'

export interface IIconButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode
}

export const IconButton = forwardRef<HTMLButtonElement, IIconButton>((props, ref) => {
	const { id, children, className, ...rest } = props
	return (
		<button
			ref={ref}
			id={id}
			{...rest}
			className={cn(
				'h-8 w-8 grid place-content-center opacity-70 hover:opacity-100 rounded-full hover:bg-muted focus:ring-2 focus:outline-none focus:ring-ring',
				className
			)}
		>
			{children}
		</button>
	)
})

IconButton.displayName = 'IconButton'
