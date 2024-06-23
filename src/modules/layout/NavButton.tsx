'use client'
import { cn } from '@/lib/utils'
import React, { ComponentProps, ComponentType, ReactElement, ReactNode, forwardRef } from 'react'

const NavButton = forwardRef<HTMLButtonElement, { Icon: ComponentType<ComponentProps<'svg'>>; isActive?: boolean; onClick?: () => void }>((props, ref) => {
	const { Icon, isActive, onClick, ...rest } = props
	return (
		<button
			ref={ref}
			onClick={onClick}
			className={cn('h-10 w-10 hover:bg-muted flex items-center justify-center rounded-xl', {
				'text-primary bg-muted': isActive,
			})}
			{...rest}
		>
			<Icon className="h-5 w-5" />
		</button>
	)
})

NavButton.displayName = 'NavButton'

export default NavButton
