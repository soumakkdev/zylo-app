import { Badge } from '@/components/ui/badge'
import { IStatus, ITask } from '@/types/tasks'

export default function KanbanView({ tasks, statusList, onViewTask }: { tasks: ITask[]; statusList: IStatus[]; onViewTask: (task: ITask) => void }) {
	return (
		<div className="flex gap-4 flex-1 px-4 pb-4">
			{statusList?.map((status) => {
				const statusTasks = tasks?.filter((task) => task.status_id === status.id)
				return (
					<div
						key={status.id}
						className="bg-card rounded-xl w-72 p-2"
						style={
							{
								// backgroundColor: status.color ? `${status.color}19` : '#f1f5f9',
							}
						}
					>
						<div className="px-1 pb-1">
							<Badge
								style={{
									color: `${status.color ?? '#0f172a'} `,
									backgroundColor: status.color ? `${status.color}19` : '#f1f5f9',
								}}
							>
								{status.name}
							</Badge>
						</div>

						<div className="flex flex-col my-1 gap-2">
							{statusTasks?.map((task) => (
								<div key={task.id} className="bg-muted text-sm p-4 rounded-lg shadow-sm" onClick={() => onViewTask(task)}>
									{task.title}
								</div>
							))}
						</div>
					</div>
				)
			})}
		</div>
	)
}
