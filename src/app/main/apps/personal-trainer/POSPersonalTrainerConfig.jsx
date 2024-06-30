import { lazy } from 'react';
import EmployeeView from './employee/EmployeeView';
import EmployeeForm from './employee/EmployeeForm';

const EmployeesApp = lazy(() => import('./EmployeesApp'));
/**
 * The EmployeesApp configuration.
 */
const POSPersonalTrainerConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: 'apps/pos/personaltrainer',
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
export default POSPersonalTrainerConfig;
