import DataGrid from '@/components/widgets/DataGrid'
import { formatDate } from '@/lib/utils'
import { IStatus, ITask } from '@/types/tasks'
import { ColumnDef } from '@tanstack/react-table'
import { TaskPriority } from '../helpers/Tasks.utils'

export default function TableView({
	tasks,
	isTasksLoading,
	onViewTask,
}: {
	tasks: ITask[]
	isTasksLoading?: boolean
	onViewTask: (task: ITask) => void
}) {
	const columns: ColumnDef<any>[] = [
		{
			accessorKey: 'title',
			header: 'Title',
			size: 200,
		},
		{
			accessorKey: 'priority',
			header: 'Priority',
			cell: ({ getValue }) => {
				const priority = getValue() as TaskPriority
				if (!priority) return null
				return <p className="capitalize">{priority}</p>
			},
			size: 50,
		},
		{
			accessorKey: 'status',
			header: 'Status',
			cell: ({ getValue }) => {
				const status = getValue() as IStatus
				if (!status) return null
				return <p>{status?.name}</p>
			},
			size: 50,
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

	return <DataGrid columns={columns} data={tasks ?? []} isLoading={isTasksLoading} onRowClick={(row) => onViewTask(row.original)} />
}
