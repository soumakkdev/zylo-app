export interface ITask {
	id: string
	created_at: string
	title: string
	description?: string | null
	priority: string
	due_date: string
	status_id: string
	project_id: string
	updated_at: string
	status?: IStatus
}

export interface IStatus {
	id: string
	name: string
	color: string
	created_at: string
	updated_at: string
}

export interface ITag {
	id: string
	name: string
	color: string
	created_at: string
}

export interface IAddTaskBody {
	title: string
	description?: string | null
	priority: string
	due_date: string
	status_id: string
	project_id: string
	user_id: string
	tag_ids?: string[]
}

export interface ITaskQuery {
	status?: string[] | null
	priority?: string[] | null
	tags?: string[] | null
	search?: string | null
	projectId: string
}
