import { lazy } from 'react';
import ClientView from './client/ClientView';
import ClientForm from './client/ClientForm';

const ClientsApp = lazy(() => import('./ClientsApp'));
/**
 * The ClientsApp configuration.
 */
const ClientsAppConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: 'apps/clients',
			element: <ClientsApp />,
			children: [
				{
					path: ':id',
					element: <ClientView />
				},
				{
					path: ':id/edit',
					element: <ClientForm />
				}
			]
		}
	]
};
export default ClientsAppConfig;
