'use client'
import { Button } from '@/components/ui/button'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { useAtom } from 'jotai'
import { Calendar, Loader, Plus, SquareKanban, Table } from 'lucide-react'
import { useState } from 'react'
import TasksFilters from './components/TasksFilters'
import { useStatus, useTasks } from './helpers/Tasks.query'
import { TasksViews, currentViewAtom } from './helpers/Tasks.utils'
import KanbanView from './views/KanbanView'
import TableView from './views/TableView'
import CalendarView from './views/calendar/CalendarView'
import AddTaskDialog from './components/AddTaskDialog'

export default function Tasks() {
	const [currentView, setCurrentView] = useAtom(currentViewAtom)
	const [isAddTaskDialogOpen, setIsAddTaskDialogOpen] = useState(false)

	const { data: tasksList, isLoading } = useTasks()
	const { data: statusList, isLoading: isStatusLoading } = useStatus()

	if (isLoading || isStatusLoading)
		return (
			<div className="h-full w-full grid place-content-center">
				<Loader className="animate-spin h-5 w-5" />
			</div>
		)

	return (
		<div className="flex-1 flex flex-col">
			<header className="flex items-center justify-between px-4 pt-4">
				<h1 className="text-xl font-bold">Tasks</h1>
				<Button onClick={() => setIsAddTaskDialogOpen(true)}>
					<Plus className="h-5 w-5 mr-1" />
					Add Task
				</Button>
			</header>

			<div className="flex items-center justify-between px-4 my-3">
				<TasksFilters statusList={statusList} />

				<ToggleGroup type="single" value={currentView} onValueChange={(value: TasksViews) => setCurrentView(value)}>
					<ToggleGroupItem value={TasksViews.Table} className="h-8 gap-1 rounded-lg px-2">
						<Table className="h-4 w-4" />
						<span>Table</span>
					</ToggleGroupItem>
					<ToggleGroupItem value={TasksViews.Kanban} className="h-8 gap-1 rounded-lg px-2">
						<SquareKanban className="h-4 w-4" />
						<span>Board</span>
					</ToggleGroupItem>
					<ToggleGroupItem value={TasksViews.Calendar} className="h-8 gap-1 rounded-lg px-2">
						<Calendar className="h-4 w-4" />
						<span>Calendar</span>
					</ToggleGroupItem>
				</ToggleGroup>
			</div>

			<>
				{currentView === TasksViews.Table ? (
					<TableView tasks={tasksList} />
				) : currentView === TasksViews.Kanban ? (
					<KanbanView tasks={tasksList} statusList={statusList} />
				) : currentView === TasksViews.Calendar ? (
					<CalendarView tasks={tasksList} />
				) : null}
			</>

			<AddTaskDialog open={isAddTaskDialogOpen} onClose={() => setIsAddTaskDialogOpen(false)} statusList={statusList} />
		</div>
	)
}
