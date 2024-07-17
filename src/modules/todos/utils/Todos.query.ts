import { createClient } from '@/lib/supabase/client'
import { ICreateTodo, ITodo } from '@/types/todos'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export function useTodos() {
	return useQuery({
		queryKey: ['todos'],
		queryFn: fetchTodos,
	})
}

async function fetchTodos() {
	const supabase = createClient()
	const { data } = await supabase.from('todos').select('*')
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

async function addTodo(todo: ICreateTodo) {
	const supabase = createClient()
	const { data, error } = await supabase.from('todos').insert([todo]).select()
	return data as ITodo[]
}
