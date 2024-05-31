import { createSlice } from '@reduxjs/toolkit';
import { rootReducer } from 'app/store/lazyLoadedSlices';

const initialState = false;
/**
 * The notificationPanel state slice.
 */
export const notificationPanelSlice = createSlice({
	name: 'notificationPanel',
	initialState,
	reducers: {
		toggleNotificationPanel: (state) => !state,
		openNotificationPanel: () => true,
		closeNotificationPanel: () => false
	},
	selectors: {
		selectNotificationPanelState: (state) => state
	}
});
/**
 * Lazy load
 * */
rootReducer.inject(notificationPanelSlice);
const injectedSlice = notificationPanelSlice.injectInto(rootReducer);
export const { toggleNotificationPanel, openNotificationPanel, closeNotificationPanel } =
	notificationPanelSlice.actions;
export const { selectNotificationPanelState } = injectedSlice.selectors;
export default notificationPanelSlice.reducer;
