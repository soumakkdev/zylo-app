import dayjs, { Dayjs } from 'dayjs'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { dateFormat } from '../calender.utils'
import { Button } from '@/components/ui/button'

export default function Header({ currentMonth, onChangeCurrentMonth }: { currentMonth: Dayjs; onChangeCurrentMonth: (day: Dayjs) => void }) {
	const nextMonth = () => {
		const plus = currentMonth.add(1, 'month')
		onChangeCurrentMonth(plus)
	}
	const prevMonth = () => {
		const minus = currentMonth.subtract(1, 'month')
		onChangeCurrentMonth(minus)
	}

	return (
		<header className="flex items-center justify-between px-4 py-1">
			<span className="text-lg font-semibold">{currentMonth.format(dateFormat)}</span>

			<div className="flex items-center gap-2">
				<Button size="sm" variant="outline" onClick={() => onChangeCurrentMonth(dayjs())}>
					Today
				</Button>

				<Button onClick={prevMonth} variant="outline" className="h-8 w-8 rounded-full p-0">
					<ChevronLeft className="h-4 w-4 text-muted-foreground" />
				</Button>
				<Button onClick={nextMonth} variant="outline" className="h-8 w-8 rounded-full p-0">
					<ChevronRight className="h-4 w-4 text-muted-foreground" />
				</Button>
			</div>
		</header>
	)
}
