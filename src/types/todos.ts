export interface ITodo {
	id: string
	title: string
	is_completed?: boolean
	created_at: string
	updated_at: string
	user_id: string
}

export interface ICreateTodo {
	title: string
	user_id: string
}
