import { useEffect, useState } from 'react'

export default function NoteTitle({ title, onTitleIUpdate }: { title: string; onTitleIUpdate?: (title: string) => void }) {
	const [text, setText] = useState(title)

	useEffect(() => {
		if (title) {
			setText(title)
		}
	}, [title])

	// function handleBlur() {
	// 	if (text !== title) {
	// 		onTitleIUpdate(text)
	// 	}
	// }

	return (
		<div className="my-4 pl-14">
			<input
				// onBlur={handleBlur}
				value={text}
				onChange={(e) => setText(e.target.value)}
				className="text-3xl w-full font-bold bg-background outline-none"
				placeholder="Untitled"
			/>
		</div>
	)
}
