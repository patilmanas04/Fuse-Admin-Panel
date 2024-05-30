import _ from '@lodash';
import FuseUtils from '@fuse/utils';
import EmployeeModel from 'src/app/main/apps/employees/models/EmployeeModel';
import mockApi from '../mock-api.json';

const employeesDB = mockApi.components.examples.employees.value;
const tagsDB = mockApi.components.examples.employees_tags.value;
export const employeesApiMocks = (mock) => {
	mock.onGet('/employees').reply(() => {
		return [200, employeesDB];
	});
	mock.onPost('/employees').reply(({ data }) => {
		const newEmployee = EmployeeModel({
			id: FuseUtils.generateGUID(),
			...JSON.parse(data)
		});
		employeesDB.push(newEmployee);
		return [200, newEmployee];
	});
	mock.onGet('/employees/tags').reply(() => {
		return [200, tagsDB];
	});
	mock.onGet('/employees/:id').reply((config) => {
		const { id } = config.params;
		const employee = _.find(employeesDB, { id });

		if (employee) {
			return [200, employee];
		}

		return [404, 'Requested employee do not exist.'];
	});
	mock.onPut('/employees/:id').reply((config) => {
		const { id } = config.params;
		const newData = JSON.parse(config.data);
		_.assign(_.find(employeesDB, { id }), newData);
		return [200, _.find(employeesDB, { id })];
	});
	mock.onDelete('/employees/:id').reply((config) => {
		const { id } = config.params;
		_.remove(employeesDB, { id });
		return [200, id];
	});
};
