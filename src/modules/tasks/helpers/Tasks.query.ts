import { createClient } from '@/lib/supabase/client'
import { IAddTaskBody, IStatus, ITag, ITask, ITaskQuery } from '@/types/tasks'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useDebounce } from '@uidotdev/usehooks'
import { useAtomValue } from 'jotai'
import { isEmpty } from 'radash'
import { searchQueryAtom, tasksFilterAtom } from './Tasks.utils'

export function useTasks() {
	const taskFilters = useAtomValue(tasksFilterAtom)
	const searchQuery = useAtomValue(searchQueryAtom)
	const debouncedSearchQuery = useDebounce(searchQuery, 500)

	const reqParams = taskFilters
	return useQuery({
		queryKey: ['tasks', reqParams, debouncedSearchQuery],
		queryFn: async () => fetchTasks({ ...reqParams, search: debouncedSearchQuery }),
	})
}

export function useStatus() {
	return useQuery({
		queryKey: ['status'],
		queryFn: fetchStatus,
	})
}

export function useTags() {
	return useQuery({
		queryKey: ['tags'],
		queryFn: fetchTags,
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

export function useDeleteTask() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: deleteTask,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['tasks'] })
		},
	})
}

async function fetchTasks(params: ITaskQuery) {
	const supabase = createClient()
	const { status, priority, search, tags } = params

	let query = supabase.from('tasks').select(`*, status:status_id(*)`)
	if (!isEmpty(status)) {
		query = query.in('status_id', status)
	}
	if (!isEmpty(priority)) {
		query = query.in('priority', priority)
	}
	// text search for title
	if (search) {
		query = query.textSearch('title', search)
	}
	if (!isEmpty(tags)) {
		// we are making an or query where tag ids contains tag1 or tag2
		const orQuery = tags.map((tag) => `tag_ids.cs.{${tag}}`).join(',')
		query = query.or(orQuery)
	}

	const { data } = await query
	return data as ITask[]
}

async function fetchStatus() {
	const supabase = createClient()
	const { data } = await supabase.from('status').select('*')
	return data as IStatus[]
}

async function fetchTags() {
	const supabase = createClient()
	const { data } = await supabase.from('tags').select('*')
	return data as ITag[]
}

async function addTask(task: IAddTaskBody) {
	const supabase = createClient()
	const { data, error } = await supabase.from('tasks').insert([task]).select()
	return data as ITask[]
}

async function deleteTask(taskId: string) {
	const supabase = createClient()
	const { data, error } = await supabase.from('tasks').delete().eq('id', taskId).select()
	return data as ITask[]
}
