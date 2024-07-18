import { createClient } from '@/lib/supabase/client'
import { ICreateTodo, ITodo } from '@/types/todos'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { produce } from 'immer'

export function useTodos() {
	return useQuery({
		queryKey: ['todos'],
		queryFn: fetchTodos,
	})
}

async function fetchTodos() {
	const supabase = createClient()
	const { data } = await supabase.from('todos').select('*').order('created_at', { ascending: true })
	return data as ITodo[]
}

export function useAddTodo() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: addTodo,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['todos'] })
		},
	})
}

export function useToggleTodo() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: toggleTodo,
		onMutate: (params) => {
			queryClient.setQueryData(['todos'], (prev: ITodo[]) => {
				return produce(prev, (draft) => {
					const currentTodo = draft.find((todo) => todo.id === params.todoId)
					currentTodo.is_completed = params.isCompleted
				})
			})
		},
	})
}

async function toggleTodo(params: { todoId: string; isCompleted: boolean }) {
	const supabase = createClient()
	const { data } = await supabase.from('todos').update({ is_completed: params?.isCompleted }).eq('id', params?.todoId).select()
	return data as ITodo[]
}

async function addTodo(todo: ICreateTodo) {
	const supabase = createClient()
	const { data, error } = await supabase.from('todos').insert([todo]).select()
	return data as ITodo[]
}
