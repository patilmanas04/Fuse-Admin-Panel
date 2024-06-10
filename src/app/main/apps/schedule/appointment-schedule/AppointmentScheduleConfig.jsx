import { lazy } from 'react';

const CalendarApp = lazy(() => import('./CalendarApp'));
/**
 * The Calendar App Config.
 */
const AppointmentScheduleConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: 'apps/schedule/apponitment-schedule',
			element: <CalendarApp />
		}
	]
};
export default AppointmentScheduleConfig;
