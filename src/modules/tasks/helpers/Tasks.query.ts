import { createClient } from '@/lib/supabase/client'
import { IAddTaskBody, IStatus, ITask, ITaskQuery } from '@/types/tasks'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useAtomValue } from 'jotai'
import { tasksFilterAtom } from './Tasks.utils'
import { isEmpty } from 'radash'
import { useParams } from 'next/navigation'

export function useTasks() {
	const taskFilters = useAtomValue(tasksFilterAtom)
	const params = useParams()
	const reqParams = { ...taskFilters, projectId: params.projectId as string }
	return useQuery({
		queryKey: ['tasks', reqParams],
		queryFn: async () => fetchTasks(reqParams),
	})
}

export function useStatus() {
	return useQuery({
		queryKey: ['status'],
		queryFn: fetchStatus,
	})
}

export function useAddTask() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: addTask,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['tasks'] })
		},
	})
}

async function fetchTasks(params: ITaskQuery) {
	const supabase = createClient()
	const { status, priority, search, projectId } = params

	let query = supabase.from('tasks').select(`*, status:status_id(*)`).eq('project_id', projectId)
	if (!isEmpty(status)) {
		query = query.in('status_id', status)
	}
	if (!isEmpty(priority)) {
		query = query.in('priority', priority)
	}
	// if (search) {
	// 	query = query.like('title', search)
	// }

	const { data } = await query
	return data as ITask[]
}

async function fetchStatus() {
	const supabase = createClient()
	const { data } = await supabase.from('status').select('*')
	return data as IStatus[]
}

async function addTask(task: IAddTaskBody) {
	const supabase = createClient()
	const { data, error } = await supabase.from('tasks').insert([task]).select()
	return data as ITask[]
}
