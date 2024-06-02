import { createSlice } from '@reduxjs/toolkit';
import _ from '@lodash';
import { rootReducer } from 'app/store/lazyLoadedSlices';

const initialState = { selectedMailIds: [], searchText: '' };
/**
 * The Mailbox App slice.
 */
export const mailboxAppSlice = createSlice({
	name: 'mailboxApp',
	initialState,
	reducers: {
		setSelectedMailIds: (state, action) => {
			state.selectedMailIds = action.payload;
		},
		selectAllMails: (state, action) => {
			const mailList = action.payload;
			state.selectedMailIds = mailList.map((mail) => mail.id);
		},
		deselectAllMails: (state) => {
			state.selectedMailIds = initialState.selectedMailIds;
		},
		toggleInSelectedMails: (state, action) => {
			const mailId = action.payload;
			state.selectedMailIds = _.xor(state.selectedMailIds, [mailId]);
		},
		setSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: (event) => ({
				payload: event.target.value || '',
				meta: undefined,
				error: null
			})
		}
	},
	selectors: {
		selectSelectedMailIds: (state) => state.selectedMailIds,
		selectSearchText: (state) => state.searchText
	}
});
/**
 * Lazy load
 * */
rootReducer.inject(mailboxAppSlice);
const injectedSlice = mailboxAppSlice.injectInto(rootReducer);
export const { selectSelectedMailIds, selectSearchText } = injectedSlice.selectors;
export const { setSelectedMailIds, toggleInSelectedMails, deselectAllMails, selectAllMails, setSearchText } =
	mailboxAppSlice.actions;
const selectedMailIdsReducer = mailboxAppSlice.reducer;
export default selectedMailIdsReducer;
