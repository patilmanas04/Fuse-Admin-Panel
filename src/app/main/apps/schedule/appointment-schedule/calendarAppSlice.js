import { createSlice } from '@reduxjs/toolkit';
import _ from '@lodash';
import { rootReducer } from 'app/store/lazyLoadedSlices';
import formatISO from 'date-fns/formatISO';

export const dateFormat = 'YYYY-MM-DDTHH:mm:ss.sssZ';
const initialState = {
	selectedLabels: [],
	eventDialog: {
		type: 'new',
		props: {
			open: false,
			anchorPosition: { top: 200, left: 400 }
		},
		data: null
	}
};
/**
 * The CalendarApp labels slice.
 */
export const calendarAppSlice = createSlice({
	name: 'calendarApp',
	initialState,
	reducers: {
		setSelectedLabels: (state, action) => {
			state.selectedLabels = action.payload;
		},
		toggleSelectedLabels: (state, action) => {
			state.selectedLabels = _.xor(state.selectedLabels, [action.payload]);
		},
		openNewEventDialog: {
			prepare: (selectInfo) => {
				const { start, end, jsEvent } = selectInfo;
				const payload = {
					type: 'new',
					props: {
						open: true,
						anchorPosition: { top: jsEvent.pageY, left: jsEvent.pageX }
					},
					data: {
						start: formatISO(start),
						end: formatISO(end)
					}
				};
				return { payload, meta: undefined, error: null };
			},
			reducer: (state, action) => {
				state.eventDialog = action.payload;
			}
		},
		openEditEventDialog: {
			prepare: (clickInfo) => {
				const { jsEvent, event } = clickInfo;
				const { id, title, allDay, start, end, extendedProps } = event;
				const payload = {
					type: 'edit',
					props: {
						open: true,
						anchorPosition: { top: jsEvent.pageY, left: jsEvent.pageX }
					},
					data: {
						id,
						title,
						allDay,
						extendedProps,
						start: formatISO(start),
						end: formatISO(end)
					}
				};
				return { payload, meta: undefined, error: null };
			},
			reducer: (state, action) => {
				state.eventDialog = action.payload;
			}
		},
		closeNewEventDialog: (state) => {
			state.eventDialog = initialState.eventDialog;
		},
		closeEditEventDialog: (state) => {
			state.eventDialog = {
				...initialState.eventDialog,
				type: 'edit'
			};
		}
	},
	selectors: {
		selectSelectedLabels: (state) => state.selectedLabels,
		selectEventDialog: (state) => state.eventDialog
	}
});
/**
 * Lazy load
 * */
rootReducer.inject(calendarAppSlice);
const injectedSlice = calendarAppSlice.injectInto(rootReducer);
export const { selectSelectedLabels, selectEventDialog } = injectedSlice.selectors;
export const {
	toggleSelectedLabels,
	setSelectedLabels,
	closeNewEventDialog,
	openEditEventDialog,
	closeEditEventDialog,
	openNewEventDialog
} = calendarAppSlice.actions;
export default calendarAppSlice.reducer;
