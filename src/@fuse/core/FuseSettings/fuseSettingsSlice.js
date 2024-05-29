import { createTheme, getContrastRatio } from '@mui/material/styles';
import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import _ from '@lodash';
import {
	defaultSettings,
	defaultThemeOptions,
	extendThemeWithMixins,
	getParsedQuerySettings,
	mustHaveThemeOptions
} from '@fuse/default-settings';
import settingsConfig from 'app/configs/settingsConfig';
import themeLayoutConfigs from 'app/theme-layouts/themeLayoutConfigs';
import { darkPaletteText, lightPaletteText } from 'app/configs/themesConfig';
import { resetUser, setUser, setUserSettings } from '../../../app/auth/user/store/userSlice';
// import { showMessage } from '@fuse/core/FuseMessage/fuseMessageSlice';
export const changeFuseTheme = createAsyncThunk(
	'fuseSettings/changeFuseTheme',
	async (theme, { dispatch, getState }) => {
		const AppState = getState();
		const settings = AppState.fuseSettings;
		const { navbar, footer, toolbar, main } = theme;
		const newSettings = {
			...settings.current,
			theme: {
				main,
				navbar,
				toolbar,
				footer
			}
		};
		return dispatch(setDefaultSettings(newSettings));
	}
);

/**
 * Gets the initial settings for the application.
 */
function getInitialSettings() {
	const defaultLayoutStyle =
		settingsConfig.layout && settingsConfig.layout.style ? settingsConfig.layout.style : 'layout1';
	const layout = {
		style: defaultLayoutStyle,
		config: themeLayoutConfigs[defaultLayoutStyle].defaults
	};
	return _.merge({}, defaultSettings, { layout }, settingsConfig, getParsedQuerySettings());
}

/**
 * Generates the settings object by merging the default settings with the new settings.
 */
export function generateSettings(_defaultSettings, _newSettings) {
	return _.merge(
		{},
		_defaultSettings,
		{ layout: { config: themeLayoutConfigs[_newSettings?.layout?.style]?.defaults } },
		_newSettings
	);
}
const initialSettings = getInitialSettings();
/**
 * The initial state.
 */
const initialState = {
	initial: initialSettings,
	defaults: _.merge({}, initialSettings),
	current: _.merge({}, initialSettings)
};
/**
 * Sets the default settings for the application.
 */
export const setDefaultSettings = createAsyncThunk(
	'fuseSettings/setDefaultSettings',
	async (val, { dispatch, getState }) => {
		const AppState = getState();
		const settings = AppState.fuseSettings;
		const defaults = generateSettings(settings.defaults, val);
		dispatch(setUserSettings(defaults));
		return {
			...settings,
			defaults: _.merge({}, defaults),
			current: _.merge({}, defaults)
		};
	}
);
/**
 * The settings slice.
 */
export const fuseSettingsSlice = createSlice({
	name: 'fuseSettings',
	initialState,
	reducers: {
		setSettings: (state, action) => {
			const current = generateSettings(state.defaults, action.payload);
			return {
				...state,
				current
			};
		},
		setInitialSettings: () => _.merge({}, initialState),
		resetSettings: (state) => ({
			...state,
			defaults: _.merge({}, state.defaults),
			current: _.merge({}, state.defaults)
		})
	},
	extraReducers: (builder) => {
		builder
			.addCase(setDefaultSettings.fulfilled, (state, action) => action.payload)
			.addCase(setUser.fulfilled, (state, action) => {
				const defaults = generateSettings(state.defaults, action.payload?.data?.settings);
				return {
					...state,
					defaults: _.merge({}, defaults),
					current: _.merge({}, defaults)
				};
			})
			.addCase(resetUser.fulfilled, (state) => {
				return {
					...state,
					defaults: _.merge({}, initialSettings),
					current: _.merge({}, initialSettings)
				};
			});
	},
	selectors: {
		selectFuseSettings: (fuseSettings) => fuseSettings,
		selectFuseSettingsDefaults: (fuseSettings) => fuseSettings.defaults,
		selectFuseSettingsCurrent: (fuseSettings) => fuseSettings.current,
		selectFuseCurrentSettings: (fuseSettings) => fuseSettings.current,
		getDirection: (fuseSettings) => fuseSettings.current.direction,
		getMainTheme: (fuseSettings) => fuseSettings.current.theme.main,
		getNavbarTheme: (fuseSettings) => fuseSettings.current.theme.navbar,
		getToolbarTheme: (fuseSettings) => fuseSettings.current.theme.toolbar,
		getFooterTheme: (fuseSettings) => fuseSettings.current.theme.footer,
		selectFuseCurrentLayoutConfig: (fuseSettings) => fuseSettings.current.layout.config,
		selectFuseDefaultSettings: (fuseSettings) => fuseSettings.defaults,
		selectCustomScrollbarsEnabled: (fuseSettings) => fuseSettings.current.customScrollbars
	}
});
export const {
	selectFuseCurrentLayoutConfig,
	selectFuseCurrentSettings,
	selectFuseSettings,
	selectFuseSettingsDefaults,
	selectFuseSettingsCurrent,
	selectFuseDefaultSettings,
	selectCustomScrollbarsEnabled,
	getDirection,
	getMainTheme,
	getNavbarTheme,
	getToolbarTheme,
	getFooterTheme
} = fuseSettingsSlice.selectors;

/**
 * Generates the MUI theme object.
 */
function generateMuiTheme(theme, direction) {
	const data = _.merge({}, defaultThemeOptions, theme, mustHaveThemeOptions);
	return createTheme(
		_.merge({}, data, {
			mixins: extendThemeWithMixins(data),
			direction
		})
	);
}

/**
 * Selects the contrast theme based on the background color.
 */
export const selectContrastMainTheme = (bgColor) => {
	function isDark(color) {
		return getContrastRatio(color, '#ffffff') >= 3;
	}

	return isDark(bgColor) ? selectMainThemeDark : selectMainThemeLight;
};

/**
 * Changes the theme mode.
 */
function changeThemeMode(theme, mode) {
	const modes = {
		dark: {
			palette: {
				mode: 'dark',
				divider: 'rgba(241,245,249,.12)',
				background: {
					paper: '#1E2125',
					default: '#121212'
				},
				text: darkPaletteText
			}
		},
		light: {
			palette: {
				mode: 'light',
				divider: '#e2e8f0',
				background: {
					paper: '#FFFFFF',
					default: '#F7F7F7'
				},
				text: lightPaletteText
			}
		}
	};
	return _.merge({}, theme, modes[mode]);
}

export const selectMainTheme = createSelector([getMainTheme, getDirection], (theme, direction) =>
	generateMuiTheme(theme, direction)
);
export const selectMainThemeDark = createSelector([getMainTheme, getDirection], (theme, direction) =>
	generateMuiTheme(changeThemeMode(theme, 'dark'), direction)
);
export const selectMainThemeLight = createSelector([getMainTheme, getDirection], (theme, direction) =>
	generateMuiTheme(changeThemeMode(theme, 'light'), direction)
);
export const selectNavbarTheme = createSelector([getNavbarTheme, getDirection], (theme, direction) =>
	generateMuiTheme(theme, direction)
);
export const selectNavbarThemeDark = createSelector([getNavbarTheme, getDirection], (theme, direction) =>
	generateMuiTheme(changeThemeMode(theme, 'dark'), direction)
);
export const selectNavbarThemeLight = createSelector([getNavbarTheme, getDirection], (theme, direction) =>
	generateMuiTheme(changeThemeMode(theme, 'light'), direction)
);
export const selectToolbarTheme = createSelector([getToolbarTheme, getDirection], (theme, direction) =>
	generateMuiTheme(theme, direction)
);
export const selectToolbarThemeDark = createSelector([getToolbarTheme, getDirection], (theme, direction) =>
	generateMuiTheme(changeThemeMode(theme, 'dark'), direction)
);
export const selectToolbarThemeLight = createSelector([getToolbarTheme, getDirection], (theme, direction) =>
	generateMuiTheme(changeThemeMode(theme, 'light'), direction)
);
export const selectFooterTheme = createSelector([getFooterTheme, getDirection], (theme, direction) =>
	generateMuiTheme(theme, direction)
);
export const selectFooterThemeDark = createSelector([getFooterTheme, getDirection], (theme, direction) =>
	generateMuiTheme(changeThemeMode(theme, 'dark'), direction)
);
export const selectFooterThemeLight = createSelector([getFooterTheme, getDirection], (theme, direction) =>
	generateMuiTheme(changeThemeMode(theme, 'light'), direction)
);
// export const selectFuseThemesSettings = (state: RootState) => state.fuseSettings.themes;
export const { resetSettings, setInitialSettings, setSettings } = fuseSettingsSlice.actions;
export default fuseSettingsSlice.reducer;
