import { atom, useAtom } from 'jotai'

export enum TasksViews {
	Table = '1',
	Kanban = '2',
	Calendar = '3',
}

export const currentViewAtom = atom(TasksViews.Table)

export enum TaskPriority {
	Urgent = '1',
	High = '2',
	Normal = '3',
	Low = '4',
}

export const PriorityOptions = [
	{
		label: 'Urgent',
		value: TaskPriority.Urgent,
	},
	{
		label: 'High',
		value: TaskPriority.High,
	},
	{
		label: 'Normal',
		value: TaskPriority.Normal,
	},
	{
		label: 'Low',
		value: TaskPriority.Low,
	},
]

export function getPriorityName(priority: TaskPriority) {
	return PriorityOptions?.find((p) => p.value === priority)?.label ?? null
}

export const searchQueryAtom = atom('')
export const statusFilterAtom = atom<string[] | null>(null)
export const priorityFilterAtom = atom<string[] | null>(null)

export const tasksFilterAtom = atom((get) => ({
	search: get(searchQueryAtom),
	status: get(statusFilterAtom),
	priority: get(priorityFilterAtom),
}))
