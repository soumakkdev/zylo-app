export interface ITask {
	id: string
	created_at: string
	title: string
	description?: string | null
	priority: string
	date: string
	status_id: number
	updated_at: string
	status?: IStatus
}

export interface IStatus {
	id: number
	name: string
	color: string
	created_at: string
}

export interface IAddTaskBody {
	title: string
	description?: string | null
	priority: string
	date: string
	status_id: number
}

export interface ITaskQuery {
	status?: string[] | null
	priority?: string[] | null
	search?: string | null
}
