import { atom, useAtom } from 'jotai'

export enum TasksViews {
	Table = '1',
	Kanban = '2',
	Calendar = '3',
}

export const currentViewAtom = atom(TasksViews.Table)

export enum TaskPriority {
	Urgent = 'urgent',
	High = 'high',
	Normal = 'normal',
	Low = 'low',
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

export const searchQueryAtom = atom('')
export const statusFilterAtom = atom<string[]>([])
export const tagsFilterAtom = atom<string[]>([])
export const priorityFilterAtom = atom<string[]>([])

export const tasksFilterAtom = atom((get) => ({
	status: get(statusFilterAtom),
	priority: get(priorityFilterAtom),
	tags: get(tagsFilterAtom),
}))
