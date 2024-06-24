import { Input } from '@/components/ui/input'
import { MultiSelectDropdown } from '@/components/widgets/MultiSelectDropdown'
import { IStatus } from '@/types/tasks'
import { useAtom } from 'jotai'
import { CircleCheck, Flag } from 'lucide-react'
import { PriorityOptions, priorityFilterAtom, searchQueryAtom, statusFilterAtom } from '../helpers/Tasks.utils'

export default function TasksFilters({ statusList }: { statusList: IStatus[] }) {
	const [searchQuery, setSearchQuery] = useAtom(searchQueryAtom)
	const [statusFilter, setStatusFilter] = useAtom(statusFilterAtom)
	const [priorityFilter, setPriorityFilter] = useAtom(priorityFilterAtom)

	const statusOptions = statusList?.map((status) => ({
		label: status.name,
		value: status.id.toString(),
	}))

	return (
		<div className="flex items-center gap-3">
			<Input placeholder="Search tasks" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />

			<MultiSelectDropdown
				trigger={
					<>
						<CircleCheck className="h-4 w-4" />
						<span>Status</span>
					</>
				}
				options={statusOptions}
				title="status"
				selected={statusFilter}
				onSelect={(selected) => setStatusFilter(selected)}
			/>

			<MultiSelectDropdown
				trigger={
					<>
						<Flag className="h-4 w-4" />
						<span>Priority</span>
					</>
				}
				options={PriorityOptions}
				title="priority"
				selected={priorityFilter}
				onSelect={(selected) => setPriorityFilter(selected)}
			/>
		</div>
	)
}
