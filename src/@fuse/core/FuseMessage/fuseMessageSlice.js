import { createSlice } from '@reduxjs/toolkit';
import { rootReducer } from 'app/store/lazyLoadedSlices';
/**
 * The initial state of the message slice.
 */
const initialState = {
	state: false,
	options: {
		variant: 'info',
		anchorOrigin: {
			vertical: 'top',
			horizontal: 'center'
		},
		autoHideDuration: 2000,
		message: 'Hi'
	}
};
/**
 * The Message slice.
 */
export const fuseMessageSlice = createSlice({
	name: 'fuseMessage',
	initialState,
	reducers: {
		showMessage(state, action) {
			state.state = true;
			state.options = {
				...initialState.options,
				...action.payload
			};
		},
		hideMessage(state) {
			state.state = false;
		}
	},
	selectors: {
		selectFuseMessageState: (fuseMessage) => fuseMessage.state,
		selectFuseMessageOptions: (fuseMessage) => fuseMessage.options
	}
});
/**
 * Lazy load
 * */
rootReducer.inject(fuseMessageSlice);
const injectedSlice = fuseMessageSlice.injectInto(rootReducer);
export const { hideMessage, showMessage } = fuseMessageSlice.actions;
export const { selectFuseMessageOptions, selectFuseMessageState } = injectedSlice.selectors;
export default fuseMessageSlice.reducer;
