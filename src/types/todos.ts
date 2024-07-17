export interface ITodo {
	id: string
	title: string
	is_complete?: string | null
	created_at: string
	updated_at: string
	user_id: string
}

export interface ICreateTodo {
	title: string
	user_id: string
}
