import { createClient } from '@/lib/supabase/client'
import { INote, IUpdateNote } from '@/types/notes'

export async function getNotes() {
	const supabase = createClient()

	let { data, error } = await supabase.from('notes').select('*')
	if (error) {
		throw new Error(error.message)
	}

	return data as INote[]
}

export async function getNote(noteId: string) {
	const supabase = createClient()
	const { data, error } = await supabase.from('notes').select('*').eq('id', noteId)

	if (error) {
		throw new Error(error.message)
	}

	return data[0]
}

export async function updateNote(noteId: string, body: IUpdateNote) {
	const supabase = createClient()
	const {
		data: { user },
	} = await supabase?.auth?.getUser()

	const { data, error } = await supabase
		.from('notes')
		.update({ ...body, user_id: user?.id })
		.eq('id', noteId)
		.select()

	if (error) {
		throw new Error(error.message)
	}

	return data[0]
}

export async function createNote(body: IUpdateNote) {
	const supabase = createClient()
	const {
		data: { user },
	} = await supabase?.auth?.getUser()

	const { data, error } = await supabase
		.from('notes')
		.insert({ ...body, user_id: user?.id })
		.select()

	if (error) {
		throw new Error(error.message)
	}

	return data[0]
}

export async function deleteNote(noteId: string) {
	const supabase = createClient()
	const { error } = await supabase.from('notes').delete().eq('id', noteId)

	if (error) {
		throw new Error(error.message)
	}

	return
}
