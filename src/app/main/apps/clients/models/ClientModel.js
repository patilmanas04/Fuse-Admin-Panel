import _ from '@lodash';
/**
 * The client phone number model.
 */
export const ClientPhoneModel = (data) =>
	_.defaults(data || {}, {
		country: '',
		phoneNumber: '',
		label: ''
	});
/**
 * The client email model.
 */
export const ClientEmailModel = (data) =>
	_.defaults(data || {}, {
		email: '',
		label: ''
	});
/**
 * The client model.
 */
const ClientModel = (data) =>
	_.defaults(data || {}, {
		id: _.uniqueId(),
		avatar: '',
		background: '',
		name: '',
		emails: [ClientEmailModel(null)],
		phoneNumbers: [ClientPhoneModel(null)],
		title: '',
		company: '',
		birthday: '',
		address: '',
		notes: '',
		tags: []
	});
export default ClientModel;
