import { lazy } from 'react';
import EmployeeView from './employee/EmployeeView';
import EmployeeForm from './employee/EmployeeForm';

const EmployeesApp = lazy(() => import('./EmployeesApp'));
/**
 * The EmployeesApp configuration.
 */
const EmployeesAppConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: 'apps/employees',
			element: <EmployeesApp />,
			children: [
				{
					path: ':id',
					element: <EmployeeView />
				},
				{
					path: ':id/edit',
					element: <EmployeeForm />
				},
			]
		}
	]
};
export default EmployeesAppConfig;
