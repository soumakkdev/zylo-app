import { ITodo } from '@/types/todos'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { produce } from 'immer'
import { addTodo, clearTodos, deleteTodo, fetchTodos, toggleTodo, updateTodo } from './Todos.data'

export function useTodos() {
	return useQuery({
		queryKey: ['todos'],
		queryFn: fetchTodos,
	})
}

export function useSaveTodo() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async ({ isEdit, title, userId, todoId }: { isEdit?: boolean; todoId?: string; title: string; userId?: string }) => {
			if (isEdit) {
				return updateTodo({ title, todoId })
			} else {
				return addTodo({ title, user_id: userId })
			}
		},
		onSuccess: (data, params) => {
			queryClient.setQueryData(['todos'], (prev: ITodo[]) => {
				return produce(prev, (draft) => {
					if (params?.isEdit) {
						const currentTodoIdx = draft.findIndex((todo) => todo.id === params.todoId)
						draft.splice(currentTodoIdx, 1, data[0])
					} else {
						draft.push(data[0])
					}
				})
			})
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

export function useDeleteTodo() {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: deleteTodo,
		onMutate: (params) => {
			queryClient.setQueryData(['todos'], (prev: ITodo[]) => {
				return produce(prev, (draft) => {
					const currentTodoIdx = draft.findIndex((todo) => todo.id === params.todoId)
					draft.splice(currentTodoIdx, 1)
				})
			})
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['todos'] })
		},
	})
}
export function useClearTodos() {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: clearTodos,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['todos'] })
		},
	})
}
