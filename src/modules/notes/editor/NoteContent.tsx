'use client'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { useNote, useUpdateNote } from '../utils/Notes.query'
import NoteEditor from './NoteEditor'
import NoteTitle from './NoteTitle'

export default function NoteContent() {
	const params = useParams()
	const noteId = params?.noteId as string
	const { mutate: updateNote, isPending, isSuccess } = useUpdateNote(noteId)
	const { data: noteData, isLoading: isNoteLoading, isFetching: isNoteFetching } = useNote(noteId)
	const [html, setHtml] = useState(noteData?.body)

	// const intervalRef = useRef(null)
	// const initialContent = useRef(html)

	// useEffect(() => {
	// 	intervalRef.current = setInterval(() => {
	// 		if (!isEqual(initialContent.current, html)) {
	// 			updateNoteContent()
	// 			initialContent.current = html
	// 		}
	// 	}, 5000)

	// 	return () => {
	// 		clearInterval(intervalRef.current)
	// 	}
	// }, [html])

	return (
		<div className="flex-1 overflow-auto relative">
			<div className="max-w-5xl mx-auto py-6">
				<NoteTitle title={noteData?.title} />
				<NoteEditor onChange={(data) => setHtml(data)} />
			</div>
		</div>
	)
}
