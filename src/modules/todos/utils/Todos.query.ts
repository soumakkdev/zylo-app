import { createClient } from '@/lib/supabase/client'
import { ITodo } from '@/types/todos'
import { useQuery } from '@tanstack/react-query'

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
