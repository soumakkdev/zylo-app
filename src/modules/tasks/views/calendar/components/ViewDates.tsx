import { cn } from '@/lib/utils'
import { ReactNode } from 'react'
import { IFormattedDateObj } from '../calender.utils'
import { ITask } from '@/types/tasks'
import dayjs from 'dayjs'

export default function ViewDates({ arrayOfDays, tasks }: { arrayOfDays: IFormattedDateObj[][]; tasks: ITask[] }) {
	const rows: ReactNode[] = []
	let days: ReactNode[] = []

	arrayOfDays.forEach((week) => {
		week.forEach((d) => {
			const currentDateTasks = tasks?.filter((task) => dayjs(task.date).isSame(dayjs(d.isoDate), 'date'))
			days.push(
				<div
					key={d.date}
					className={cn('relative overflow-auto bg-background font-medium text-foreground', 'relative px-2 py-2', {
						'bg-muted text-muted-foreground': !d.isCurrentMonth,
					})}
				>
					<time
						dateTime={d.date.toString()}
						className={cn('sticky top-0 grid h-6 w-6 place-content-center rounded-full', {
							'bg-primary text-primary-foreground': d.isCurrentDay,
						})}
					>
						{d.date}
					</time>

					{currentDateTasks?.map((task) => (
						<div
							key={task.id}
							className="whitespace-nowrap overflow-hidden shadow rounded-md px-2 flex items-center gap-2"
							style={{
								backgroundColor: `${task?.status?.color}19`,
								border: `1px solid ${task?.status?.color}80`,
							}}
						>
							<div className="h-2 w-2 rounded-full flex-shrink-0" style={{ backgroundColor: task?.status?.color }}></div>

							{task.title}
						</div>
					))}
				</div>
			)
		})
		rows.push(days)
		days = []
	})

	return <div className="grid w-full grid-cols-7 grid-rows-6 gap-px">{rows}</div>
}
