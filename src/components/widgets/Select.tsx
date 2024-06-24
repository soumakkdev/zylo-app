import React from 'react'
import { SelectContent, SelectGroup, SelectItem, SelectLabel, SelectRoot, SelectTrigger, SelectValue } from '@/components/ui/select'

export interface ISelectOption {
	label: string
	value: string
}

interface ISelect {
	value: string
	onChange: (value: string) => void
	options: ISelectOption[]
	placeholder?: string
	id: string
	className?: string
	disabled?: boolean
}

export default function Select(props: ISelect) {
	const { id, onChange, options, value, className, disabled, placeholder } = props
	return (
		<SelectRoot value={value} onValueChange={(value) => onChange(value)}>
			<SelectTrigger id={id} className="w-full" disabled={disabled}>
				<SelectValue placeholder={placeholder ?? 'Select a option'} />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					{options?.map((opt) => (
						<SelectItem key={opt.value} value={opt.value}>
							{opt.label}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</SelectRoot>
	)
}
