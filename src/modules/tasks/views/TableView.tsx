import { Badge } from '@/components/ui/badge'
import DataTable from '@/components/widgets/DataTable'
import { cn, formatDate } from '@/lib/utils'
import { IStatus, ITag, ITask } from '@/types/tasks'
import { ColumnDef } from '@tanstack/react-table'
import { TaskPriority } from '../helpers/Tasks.utils'
import Flag from '@/components/icons/Flag'

export default function TableView({
	tasks,
	isTasksLoading,
	onViewTask,
	statusList,
	tagsList,
}: {
	tasks: ITask[]
	isTasksLoading?: boolean
	onViewTask: (task: ITask) => void
	statusList: IStatus[]
	tagsList: ITag[]
}) {
	const columns: ColumnDef<any>[] = [
		{
			accessorKey: 'title',
			header: 'Title',
			size: 200,
		},
		{
			accessorKey: 'description',
			header: 'Description',
			size: 200,
		},
		{
			accessorKey: 'priority',
			header: 'Priority',
			cell: ({ getValue }) => {
				const priority = getValue() as TaskPriority
				if (!priority) return null
				console.log(priority)
				return (
					<p className="capitalize text-sm flex items-center gap-2">
						<Flag
							className={cn('h-4 w-4', {
								'fill-red-500': priority === TaskPriority.Urgent,
								'fill-yellow-500': priority === TaskPriority.High,
								'fill-blue-500': priority === TaskPriority.Normal,
								'fill-gray-500': priority === TaskPriority.Low,
							})}
						/>
						{priority}
					</p>
				)
			},
			size: 50,
		},
		{
			accessorKey: 'status',
			header: 'Status',
			cell: ({ getValue }) => {
				const status = getValue() as IStatus
				if (!status) return null
				const statusInfo = statusList?.find((opt) => opt.id === status.id)
				return statusInfo ? (
					<Badge
						className="text-black"
						style={{
							backgroundColor: statusInfo?.color,
						}}
					>
						{statusInfo?.name}
					</Badge>
				) : null
			},
		},
		{
			accessorKey: 'tag_ids',
			header: 'Tags',
			cell: ({ getValue }) => {
				const tagIds = getValue() as string[]
				if (!tagIds?.length) return null
				const tags = tagsList?.filter((opt) => tagIds?.includes(opt.id))
				return tags ? (
					<div className="flex gap-1">
						{tags?.slice(0, 3)?.map((tag) => (
							<Badge variant="outline" key={tag.id}>
								{tag.name}
							</Badge>
						))}
					</div>
				) : null
			},
		},
		{
			accessorKey: 'due_date',
			header: 'Date',
			cell: ({ getValue }) => {
				const date = getValue() as string
				if (!date) return null
				return <p>{formatDate(date)}</p>
			},
			size: 100,
		},
		{
			accessorKey: 'updated_at',
			header: 'Last updated',
			cell: ({ getValue }) => {
				const updated = getValue() as string
				if (!updated) return null
				return <p>{formatDate(updated, 'MMM DD, YYYY HH:mm a')}</p>
			},
			size: 100,
		},
	]

	return <DataTable columns={columns} data={tasks ?? []} isLoading={isTasksLoading} onRowClick={(row) => onViewTask(row.original)} />
}
