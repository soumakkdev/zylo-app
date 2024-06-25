import { INote, IUpdateNote } from '@/types/notes'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { produce } from 'immer'
import { createNote, deleteNote, getNote, getNotes, updateNote } from './notes.data'

export function useNotes() {
	return useQuery({
		queryKey: ['notes'],
		queryFn: getNotes,
	})
}

export function useNote(noteId: string) {
	return useQuery({
		queryFn: () => getNote(noteId),
		queryKey: ['notes', noteId],
		enabled: !!noteId,
	})
}

export function useUpdateNote(noteId: string) {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (body: IUpdateNote) => updateNote(noteId, body),
		onSuccess: (data: INote) => {
			queryClient.setQueryData(['notes', 'all'], (prev: INote[]) => {
				return produce(prev, (draft) => {
					const idx = draft.findIndex((note) => note.id === noteId)
					draft.splice(idx, 1, data)
				})
			})
		},
	})
}

export function useCreateNote() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (body: IUpdateNote) => createNote(body),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['notes', 'all'] })
		},
	})
}

export function useDeleteNote() {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: (noteId: string) => deleteNote(noteId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['notes', 'all'] })
		},
	})
}
