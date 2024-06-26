import FuseUtils from '@fuse/utils';
import FuseLoading from '@fuse/core/FuseLoading';
import { Navigate } from 'react-router-dom';
import settingsConfig from 'app/configs/settingsConfig';
import SignInConfig from '../main/sign-in/SignInConfig';
import SignUpConfig from '../main/sign-up/SignUpConfig';
import SignOutConfig from '../main/sign-out/SignOutConfig';
import appsConfigs from '../main/apps/appsConfigs';
import Error404Page from '../main/404/Error404Page';
import ExampleConfig from '../main/example/ExampleConfig';
import ProjectDashboardApp from '../main/dashboards/project/ProjectDashboardApp';
import AnalyticsDashboardApp from '../main/dashboards/analytics copy/AnalyticsDashboardApp';

const routeConfigs = [
	SignOutConfig,
	SignInConfig,
	SignUpConfig,
	...appsConfigs
];
/**
 * The routes of the application.
 */
const routes = [
	...FuseUtils.generateRoutesFromConfigs(routeConfigs, settingsConfig.defaultAuth),
	{
		path: '/',
		element: <Navigate to="/dashboards/project" />,
		auth: settingsConfig.defaultAuth
	},
	{
		path: 'loading',
		element: <FuseLoading />
	},
	{
		path: '404',
		element: <Error404Page />
	},
	{
		path: '*',
		element: <Navigate to="404" />
	},
	{
		path: '/dashboards/project',
		element: <ProjectDashboardApp />,
		auth: settingsConfig.defaultAuth
	},
	{
		path: '/dashboards/analytics',
		element: <AnalyticsDashboardApp />,
		auth: settingsConfig.defaultAuth
	},
];
export default routes;
