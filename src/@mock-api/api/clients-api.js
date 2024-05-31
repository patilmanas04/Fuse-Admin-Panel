import _ from '@lodash';
import FuseUtils from '@fuse/utils';
import ClientModel from 'src/app/main/apps/clients/models/ClientModel';
import mockApi from '../mock-api.json';

const clientsDB = mockApi.components.examples.employees.value;
const tagsDB = mockApi.components.examples.employees_tags.value;
export const clientsApiMocks = (mock) => {
	mock.onGet('/clients').reply(() => {
		return [200, clientsDB];
	});
	mock.onPost('/clients').reply(({ data }) => {
		const newClient = ClientModel({
			id: FuseUtils.generateGUID(),
			...JSON.parse(data)
		});
		clientsDB.push(newClient);
		return [200, newClient];
	});
	mock.onGet('/clients/tags').reply(() => {
		return [200, tagsDB];
	});
	mock.onGet('/clients/:id').reply((config) => {
		const { id } = config.params;
		const client = _.find(clientsDB, { id });

		if (client) {
			return [200, client];
		}

		return [404, 'Requested client do not exist.'];
	});
	mock.onPut('/clients/:id').reply((config) => {
		const { id } = config.params;
		const newData = JSON.parse(config.data);
		_.assign(_.find(clientsDB, { id }), newData);
		return [200, _.find(clientsDB, { id })];
	});
	mock.onDelete('/clients/:id').reply((config) => {
		const { id } = config.params;
		_.remove(clientsDB, { id });
		return [200, id];
	});
};
