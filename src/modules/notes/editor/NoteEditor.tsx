'use client'

import '@blocknote/core/fonts/inter.css'
import { BlockNoteView } from '@blocknote/mantine'
import '@blocknote/mantine/style.css'
import { AddBlockButton, DragHandleButton, SideMenu, SideMenuController, useCreateBlockNote } from '@blocknote/react'
import { useTheme } from 'next-themes'
import { useEffect } from 'react'
import './BlockNote.css'

export default function NoteEditor({ initialValue, onChange }: { initialValue?: string; onChange?: (data: string) => void }) {
	const { theme } = useTheme()
	const editor = useCreateBlockNote()

	useEffect(() => {
		async function loadInitialHTML() {
			if (editor && initialValue) {
				const blocks = await editor?.tryParseHTMLToBlocks(initialValue)
				editor.replaceBlocks(editor.document, blocks)
			}
		}

		loadInitialHTML()
	}, [editor, initialValue])

	// Renders the editor instance using a React component.
	return (
		<BlockNoteView
			editor={editor}
			onChange={async () => {
				const html = await editor.blocksToHTMLLossy(editor.document)
				onChange(html)
			}}
			theme={theme as any}
			data-custom-theme
			sideMenu={false}
		>
			<SideMenuController
				sideMenu={(props) => (
					<SideMenu {...props}>
						<AddBlockButton {...props} />
						<DragHandleButton {...props} />
					</SideMenu>
				)}
			/>
		</BlockNoteView>
	)
}
