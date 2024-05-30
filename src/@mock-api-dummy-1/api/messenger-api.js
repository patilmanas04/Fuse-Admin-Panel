import _ from '@lodash';
import FuseUtils from '@fuse/utils';
import mockApi from '../mock-api.json';

const employeesDB = mockApi.components.examples.chat_employees.value;
let userDB = mockApi.components.examples.chat_profile.value;
const userChatListDB = mockApi.components.examples.chat_chats.value;
const messages = mockApi.components.examples.chat_messages.value;
const chatsDB = userChatListDB.map((chat) => ({
	...chat,
	messages: messages.map((message) => ({
		...message,
		employeeId: message.employeeId === '' ? chat.employeeId : userDB.id
	}))
}));
export const messengerApiMocks = (mock) => {
	mock.onGet('/messenger/employees').reply(() => {
		return [200, employeesDB];
	});
	mock.onGet('/messenger/employees/:employeeId').reply((config) => {
		const { employeeId } = config.params;
		const employee = _.find(employeesDB, { id: employeeId });

		if (!employee) {
			return [404, 'Requested data do not exist.'];
		}

		return [200, employee];
	});
	mock.onGet('/messenger/chats').reply(() => {
		userChatListDB.sort((d1, d2) => new Date(d2.lastMessageAt).getTime() - new Date(d1.lastMessageAt).getTime());
		return [200, userChatListDB];
	});
	mock.onGet('/messenger/chats/:employeeId').reply((config) => {
		const { employeeId } = config.params;
		const employee = _.find(employeesDB, { id: employeeId });

		if (!employee) {
			return [404, 'Requested data do not exist.'];
		}

		const chat = _.find(chatsDB, { employeeId })?.messages;

		if (chat) {
			return [200, chat];
		}

		return [200, []];
	});
	mock.onPost('/messenger/chats/:employeeId').reply((config) => {
		const { employeeId } = config.params;
		const employee = _.find(employeesDB, { id: employeeId });

		if (!employee) {
			return [404, 'Requested data do not exist.'];
		}

		const employeeChat = _.find(chatsDB, { employeeId });

		if (!employeeChat) {
			createNewChat(employeeId);
		}

		const newMessage = createNewMessage(config.data, employeeId);
		return [200, newMessage];
	});
	mock.onGet('/messenger/profile').reply(() => {
		return [200, userDB];
	});
	mock.onPut('/messenger/profile').reply(({ data }) => {
		const userData = JSON.parse(data);
		userDB = _.merge({}, userDB, userData);
		return [200, userDB];
	});

	function createNewMessage(value, employeeId) {
		const message = {
			id: FuseUtils.generateGUID(),
			employeeId: userDB.id,
			value,
			createdAt: new Date().toISOString(),
			chatId: ''
		};
		const selectedChat = _.find(chatsDB, { employeeId });
		const userSelectedChat = _.find(userChatListDB, { employeeId });
		selectedChat.messages.push(message);
		selectedChat.lastMessage = value;
		selectedChat.lastMessageAt = message.createdAt;
		userSelectedChat.lastMessage = value;
		userSelectedChat.lastMessageAt = message.createdAt;
		return message;
	}

	function createNewChat(employeeId) {
		const newChat = {
			id: FuseUtils.generateGUID(),
			employeeId,
			unreadCount: 0,
			muted: false,
			lastMessage: '',
			lastMessageAt: ''
		};
		userChatListDB.push(newChat);
		const newMessageData = {
			...newChat,
			messages: []
		};
		chatsDB.push(newMessageData);
		return newMessageData;
	}
};
