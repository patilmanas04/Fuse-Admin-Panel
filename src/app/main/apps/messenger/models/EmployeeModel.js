import _ from '@lodash';

/**
 * Employee model.
 */
function EmployeeModel(data) {
	data = data || {};
	return _.defaults(data, {
		id: _.uniqueId(),
		avatar: '',
		name: '',
		about: '',
		status: 'offline',
		details: {
			emails: [],
			phoneNumbers: [],
			title: '',
			company: '',
			birthday: '',
			address: ''
		},
		attachments: {
			media: [],
			docs: [],
			links: []
		}
	});
}

export default EmployeeModel;
