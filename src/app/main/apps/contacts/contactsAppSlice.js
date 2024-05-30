import { createSlice } from '@reduxjs/toolkit';
import { rootReducer } from 'app/store/lazyLoadedSlices';

const initialState = { searchText: '' };
/**
 * The Contacts App slice.
 */
export const contactsAppSlice = createSlice({
	name: 'contactsApp',
	initialState,
	reducers: {
		setSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: (event) => ({
				payload: `${event?.target?.value}` || initialState,
				meta: undefined,
				error: null
			})
		},
		resetSearchText: (state) => {
			state.searchText = initialState.searchText;
		}
	},
	selectors: {
		selectSearchText: (state) => state.searchText
	}
});
/**
 * Lazy load
 * */
rootReducer.inject(contactsAppSlice);
const injectedSlice = contactsAppSlice.injectInto(rootReducer);
export const { setSearchText, resetSearchText } = contactsAppSlice.actions;
export const { selectSearchText } = injectedSlice.selectors;
const searchTextReducer = contactsAppSlice.reducer;
export default searchTextReducer;
