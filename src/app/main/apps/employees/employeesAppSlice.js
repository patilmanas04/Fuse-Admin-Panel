import { createSlice } from '@reduxjs/toolkit';
import { rootReducer } from 'app/store/lazyLoadedSlices';

const initialState = { searchText: '' };
/**
 * The Employees App slice.
 */
export const employeesAppSlice = createSlice({
	name: 'employeesApp',
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
rootReducer.inject(employeesAppSlice);
const injectedSlice = employeesAppSlice.injectInto(rootReducer);
export const { setSearchText, resetSearchText } = employeesAppSlice.actions;
export const { selectSearchText } = injectedSlice.selectors;
const searchTextReducer = employeesAppSlice.reducer;
export default searchTextReducer;
