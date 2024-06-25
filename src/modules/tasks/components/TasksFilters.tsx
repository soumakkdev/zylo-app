import { Input } from '@/components/ui/input'
import { MultiDropdown } from '@/components/widgets/MultiDropdown'
import { IStatus, ITag } from '@/types/tasks'
import { useAtom } from 'jotai'
import { CircleCheck, Flag, Tag } from 'lucide-react'
import { PriorityOptions, priorityFilterAtom, searchQueryAtom, statusFilterAtom, tagsFilterAtom } from '../helpers/Tasks.utils'

export default function TasksFilters({ statusList, tagsList }: { statusList: IStatus[]; tagsList: ITag[] }) {
	const [searchQuery, setSearchQuery] = useAtom(searchQueryAtom)
	const [statusFilter, setStatusFilter] = useAtom(statusFilterAtom)
	const [tagsFilter, setTagsFilter] = useAtom(tagsFilterAtom)
	const [priorityFilter, setPriorityFilter] = useAtom(priorityFilterAtom)

	const statusOptions = statusList?.map((status) => ({
		label: status.name,
		value: status.id,
	}))

	const tagsOptions = tagsList?.map((tag) => ({
		label: tag.name,
		value: tag.id,
	}))

	return (
		<div className="flex items-center gap-3">
			<Input placeholder="Search tasks" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />

			<MultiDropdown
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

			<MultiDropdown
				trigger={
					<>
						<Tag className="h-4 w-4" />
						<span>Tags</span>
					</>
				}
				options={tagsOptions}
				title="tags"
				selected={tagsFilter}
				onSelect={(selected) => setTagsFilter(selected)}
			/>

			<MultiDropdown
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
