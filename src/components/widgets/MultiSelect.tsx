'use client'

import * as React from 'react'

import { ChevronsUpDown } from 'lucide-react'
import { isEmpty } from 'radash'
import { Button } from '../ui/button'
import { Checkbox } from '../ui/checkbox'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '../ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { ISelectOption } from './Select'

export function MultiSelect(props: { id?: string; value: string[]; onChange: (selected: string[]) => void; options: ISelectOption[]; title: string }) {
	const { id, options, title, value, onChange } = props
	const [open, setOpen] = React.useState(false)

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button id={id} variant="outline" role="combobox" aria-expanded={open} className="flex w-full justify-between">
					{!isEmpty(value)
						? options
								.filter((opt) => value?.includes(opt.value))
								?.map((opt) => opt.label)
								.join(', ')
						: 'Select options'}
					<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="p-0" align="start">
				<Command>
					<CommandInput placeholder={`Search ${title}`} />
					<CommandEmpty>No {title} found.</CommandEmpty>
					<CommandGroup>
						{options.map((opt) => (
							<CommandItem
								key={opt.value}
								value={opt.value}
								onSelect={(currentValue) => {
									const temp = new Set(value)
									if (temp.has(currentValue)) {
										temp.delete(currentValue)
									} else {
										temp.add(currentValue)
									}
									onChange(Array.from(temp))
								}}
							>
								<Checkbox checked={value?.includes(opt.value)} className="mr-2" />
								{opt.label}
							</CommandItem>
						))}
					</CommandGroup>
				</Command>
			</PopoverContent>
		</Popover>
	)
}
