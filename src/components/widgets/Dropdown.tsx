import React, { ReactNode } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { ISelectOption } from './Select'

export default function Dropdown(props: { options: ISelectOption[]; children: ReactNode; onSelect: (value: string) => void }) {
	const { options, children, onSelect } = props
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
			<DropdownMenuContent>
				{options?.map((opt) => (
					<DropdownMenuItem key={opt.value} onClick={() => onSelect(opt.value)}>
						{opt.label}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
