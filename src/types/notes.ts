export interface INote {
	title: string
	body?: string
	updated_at: string
	created_at: string
	id: string
	is_important: boolean
	project_id: string
	user_id: string
}

export interface IUpdateNote {
	title?: string
	content?: string
}
