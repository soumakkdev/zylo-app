'use client'
import { Button } from '@/components/ui/button'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { useAtom } from 'jotai'
import { Loader, Plus, SquareKanban, Table } from 'lucide-react'
import { useState } from 'react'
import AddTaskDialog from './components/AddTaskDialog'
import TasksFilters from './components/TasksFilters'
import ViewTaskDetails from './components/ViewTaskDetails'
import { useStatus, useTags, useTasks } from './helpers/Tasks.query'
import { TasksViews, currentViewAtom } from './helpers/Tasks.utils'
import KanbanView from './views/KanbanView'
import TableView from './views/TableView'

export default function Tasks() {
	const [currentView, setCurrentView] = useAtom(currentViewAtom)
	const [isAddTaskDialogOpen, setIsAddTaskDialogOpen] = useState(false)
	const [selectedTaskToView, setSelectedTaskToView] = useState(null)

	const { data: tasksList, isLoading } = useTasks()
	const { data: statusList, isLoading: isStatusLoading } = useStatus()
	const { data: tagsList, isLoading: isTagsLoading } = useTags()

	if (isStatusLoading || isTagsLoading)
		return (
			<div className="h-full w-full grid place-content-center">
				<Loader className="animate-spin h-5 w-5" />
			</div>
		)

	return (
		<div className="flex-1 flex flex-col overflow-hidden">
			<header className="flex items-center justify-between px-4 pt-4">
				<h1 className="text-xl font-bold">Tasks</h1>
				<Button onClick={() => setIsAddTaskDialogOpen(true)} className="rounded-full">
					<Plus className="h-5 w-5 mr-1 -ml-1" />
					Add Task
				</Button>
			</header>

			<div className="flex items-center justify-between px-4 my-3">
				<TasksFilters statusList={statusList} tagsList={tagsList} />

				<ToggleGroup type="single" value={currentView} onValueChange={(value: TasksViews) => setCurrentView(value)}>
					<ToggleGroupItem value={TasksViews.Table} className="h-8 gap-1 rounded-lg px-2">
						<Table className="h-4 w-4" />
						<span>Table</span>
					</ToggleGroupItem>
					<ToggleGroupItem value={TasksViews.Kanban} className="h-8 gap-1 rounded-lg px-2">
						<SquareKanban className="h-4 w-4" />
						<span>Board</span>
					</ToggleGroupItem>
				</ToggleGroup>
			</div>

			<>
				{currentView === TasksViews.Table ? (
					<TableView
						tasks={tasksList}
						isTasksLoading={isLoading}
						statusList={statusList}
						tagsList={tagsList}
						onViewTask={(task) => setSelectedTaskToView(task)}
					/>
				) : currentView === TasksViews.Kanban ? (
					<KanbanView tasks={tasksList} statusList={statusList} onViewTask={(task) => setSelectedTaskToView(task)} />
				) : null}
			</>

			{isAddTaskDialogOpen && (
				<AddTaskDialog open={isAddTaskDialogOpen} onClose={() => setIsAddTaskDialogOpen(false)} statusList={statusList} tagsList={tagsList} />
			)}

			{selectedTaskToView !== null && (
				<ViewTaskDetails open={selectedTaskToView !== null} onClose={() => setSelectedTaskToView(null)} task={selectedTaskToView} />
			)}
		</div>
	)
}
