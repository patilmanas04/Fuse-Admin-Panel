import { createSlice } from '@reduxjs/toolkit';
import { rootReducer } from 'app/store/lazyLoadedSlices';

const initialState = {
	cardDialog: {
		open: false,
		data: null
	}
};
/**
 * The Scrumboard Slice.
 */
export const scrumboardSlice = createSlice({
	name: 'scrumboardApp',
	initialState,
	reducers: {
		openCardDialog: (state, action) => {
			state.cardDialog = { open: true, data: action.payload };
		},
		closeCardDialog: (state) => {
			state.cardDialog = initialState.cardDialog;
		}
	},
	selectors: {
		selectCardDialogOpen: (state) => state.cardDialog.open,
		selectCardDialogData: (state) => state.cardDialog.data
	}
});
/**
 * Lazy load
 * */
rootReducer.inject(scrumboardSlice);
const injectedSlice = scrumboardSlice.injectInto(rootReducer);
export const { openCardDialog, closeCardDialog } = scrumboardSlice.actions;
export const { selectCardDialogOpen, selectCardDialogData } = injectedSlice.selectors;
export default scrumboardSlice.reducer;
