import { formatDate } from '@/lib/utils'
import { ColumnDef } from '@tanstack/react-table'
import { IStatus, ITask } from '@/types/tasks'
import { TaskPriority } from '../helpers/Tasks.utils'
import DataTable from '@/components/widgets/DataTable'
import DataGrid from '@/components/widgets/DataGrid'

export default function TableView({ tasks }: { tasks: ITask[] }) {
	const columns: ColumnDef<any>[] = [
		{
			accessorKey: 'title',
			header: 'Title',
		},
		{
			accessorKey: 'priority',
			header: 'Priority',
			cell: ({ getValue }) => {
				const priority = getValue() as TaskPriority
				if (!priority) return null
				return <p className="capitalize">{priority}</p>
			},
		},
		{
			accessorKey: 'status',
			header: 'Status',
			cell: ({ getValue }) => {
				const status = getValue() as IStatus
				if (!status) return null
				return <p>{status?.name}</p>
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
		},
		{
			accessorKey: 'updated_at',
			header: 'Last updated',
			cell: ({ getValue }) => {
				const updated = getValue() as string
				if (!updated) return null
				return <p>{formatDate(updated)}</p>
			},
		},
	]

	return <DataGrid columns={columns} data={tasks} />
}
