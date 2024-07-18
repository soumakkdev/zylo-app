import { createClient } from '@/lib/supabase/client'
import { ITodo, ICreateTodoBody } from '@/types/todos'

export async function fetchTodos() {
	const supabase = createClient()
	const { data } = await supabase.from('todos').select('*').order('created_at', { ascending: true })
	return data as ITodo[]
}

export async function toggleTodo(params: { todoId: string; isCompleted: boolean }) {
	const supabase = createClient()
	const { data, error } = await supabase.from('todos').update({ is_completed: params?.isCompleted }).eq('id', params?.todoId).select()
	if (error) {
		throw error
	}
	return data as ITodo[]
}

export async function addTodo(todo: ICreateTodoBody) {
	const supabase = createClient()
	const { data, error } = await supabase.from('todos').insert([todo]).select()
	if (error) {
		throw error
	}
	return data as ITodo[]
}

export async function updateTodo(params: { title: string; todoId: string }) {
	const supabase = createClient()
	const { data, error } = await supabase.from('todos').update({ title: params?.title }).eq('id', params?.todoId).select()
	if (error) {
		throw error
	}
	return data as ITodo[]
}

export async function deleteTodo(params: { todoId: string }) {
	const supabase = createClient()
	const { data, error } = await supabase.from('todos').delete().eq('id', params?.todoId).select()
	if (error) {
		throw error
	}
	return data as ITodo[]
}

export async function clearTodos() {
	const supabase = createClient()
	const { data, error } = await supabase.from('todos').delete().eq('is_completed', true).select()
	if (error) {
		throw error
	}
	return data as ITodo[]
}
