import _ from '@lodash';
/**
 * The employee phone number model.
 */
export const EmployeePhoneModel = (data) =>
	_.defaults(data || {}, {
		country: '',
		phoneNumber: '',
		label: ''
	});
/**
 * The employee email model.
 */
export const EmployeeEmailModel = (data) =>
	_.defaults(data || {}, {
		email: '',
		label: ''
	});
/**
 * The employee model.
 */
const EmployeeModel = (data) =>
	_.defaults(data || {}, {
		id: _.uniqueId(),
		avatar: '',
		background: '',
		name: '',
		emails: [EmployeeEmailModel(null)],
		phoneNumbers: [EmployeePhoneModel(null)],
		title: '',
		company: '',
		birthday: '',
		address: '',
		notes: '',
		tags: []
	});
export default EmployeeModel;
