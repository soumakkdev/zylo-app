'use client'

import DataTable from '@/components/widgets/DataTable'
import { formatDate } from '@/lib/utils'
import { INote } from '@/types/notes'
import { ColumnDef } from '@tanstack/react-table'
import { useParams, useRouter } from 'next/navigation'

export default function NotesList({ notes }: { notes: INote[] }) {
	const { projectId } = useParams()
	const router = useRouter()

	const columns: ColumnDef<any>[] = [
		{
			accessorKey: 'title',
			header: 'Title',
		},
		{
			accessorKey: 'created_at',
			header: 'Created at',
			cell: ({ getValue }) => {
				const updated = getValue() as string
				if (!updated) return null
				return <p>{formatDate(updated)}</p>
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

	return <DataTable columns={columns} data={notes} onRowClick={(row) => router.push(`/project/${projectId}/notes/${row.original.id}`)} />
}
