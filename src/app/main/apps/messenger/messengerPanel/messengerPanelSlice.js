import { createSlice } from '@reduxjs/toolkit';
import { rootReducer } from 'app/store/lazyLoadedSlices';

const initialState = {
	selectedEmployeeId: '',
	open: false
};
/**
 * The slice for the employees.
 */
export const messengerPanelSlice = createSlice({
	name: 'chatPanel',
	initialState,
	reducers: {
		setSelectedEmployeeId: (state, action) => {
			state.selectedEmployeeId = action.payload;
		},
		removeSelectedEmployeeId: (state) => {
			state.selectedEmployeeId = '';
		},
		toggleChatPanel: (state) => {
			state.open = !state;
		},
		openChatPanel: (state) => {
			state.open = true;
		},
		closeChatPanel: (state) => {
			state.open = false;
		}
	},
	selectors: {
		selectSelectedEmployeeId: (state) => state.selectedEmployeeId,
		selectChatPanelOpen: (state) => state.open
	}
});
/**
 * Lazy load
 * */
rootReducer.inject(messengerPanelSlice);
const injectedSlice = messengerPanelSlice.injectInto(rootReducer);
export const { setSelectedEmployeeId, openChatPanel, toggleChatPanel, removeSelectedEmployeeId, closeChatPanel } =
	messengerPanelSlice.actions;
export const { selectSelectedEmployeeId, selectChatPanelOpen } = injectedSlice.selectors;
export default messengerPanelSlice.reducer;
