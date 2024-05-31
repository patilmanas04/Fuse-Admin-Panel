import { createSlice } from '@reduxjs/toolkit';
import { rootReducer } from 'app/store/lazyLoadedSlices';

const initialState = { searchText: '' };
/**
 * The Clients App slice.
 */
export const clientsAppSlice = createSlice({
	name: 'clientsApp',
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
rootReducer.inject(clientsAppSlice);
const injectedSlice = clientsAppSlice.injectInto(rootReducer);
export const { setSearchText, resetSearchText } = clientsAppSlice.actions;
export const { selectSearchText } = injectedSlice.selectors;
const searchTextReducer = clientsAppSlice.reducer;
export default searchTextReducer;
