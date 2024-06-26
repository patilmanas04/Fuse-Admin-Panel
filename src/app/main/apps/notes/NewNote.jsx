import ClickAwayListener from '@mui/material/ClickAwayListener';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import NoteForm from './note-form/NoteForm';

/**
 * The new note component.
 */
function NewNote() {
	const [formOpen, setFormOpen] = useState(false);

	function handleFormOpen(ev) {
		ev.stopPropagation();
		setFormOpen(true);
		document.addEventListener('keydown', escFunction, false);
	}

	function handleFormClose() {
		if (!formOpen) {
			return;
		}

		setFormOpen(false);
		document.removeEventListener('keydown', escFunction, false);
	}

	function escFunction(event) {
		if (event.key === 'Escape') {
			handleFormClose();
		}
	}

	function handleClickAway(event) {
		const preventCloseElements = document.querySelector('.prevent-add-close');
		const preventClose = preventCloseElements ? preventCloseElements.contains(event.target) : false;

		if (preventClose) {
			return;
		}

		handleFormClose();
	}

	return (
		<Paper className="flex items-center w-full max-w-512 mt-8 mb-16 min-h-48 shadow shrink-0 cursor-text">
			{formOpen ? (
				<ClickAwayListener onClickAway={handleClickAway}>
					<div className="w-full">
						<NoteForm
							onClose={handleFormClose}
							variant="new"
						/>
					</div>
				</ClickAwayListener>
			) : (
				<Typography
					className="px-16 py-12 text-16 w-full"
					color="text.secondary"
					onClick={handleFormOpen}
				>
					New shift
				</Typography>
			)}
		</Paper>
	);
}

export default NewNote;
