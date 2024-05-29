import { createSlice } from '@reduxjs/toolkit';
import { rootReducer } from 'app/store/lazyLoadedSlices';
/**
 * The initial state of the dialog slice.
 */
const initialState = {
	open: false,
	children: ''
};
/**
 * The Fuse Dialog slice
 */
export const fuseDialogSlice = createSlice({
	name: 'fuseDialog',
	initialState,
	reducers: {
		openDialog: (state, action) => {
			state.open = true;
			state.children = action.payload.children;
		},
		closeDialog: () => initialState
	},
	selectors: {
		selectFuseDialogState: (fuseDialog) => fuseDialog.open,
		selectFuseDialogProps: (fuseDialog) => fuseDialog
	}
});
/**
 * Lazy load
 * */
rootReducer.inject(fuseDialogSlice);
const injectedSlice = fuseDialogSlice.injectInto(rootReducer);
export const { closeDialog, openDialog } = fuseDialogSlice.actions;
export const { selectFuseDialogState, selectFuseDialogProps } = injectedSlice.selectors;
export default fuseDialogSlice.reducer;
