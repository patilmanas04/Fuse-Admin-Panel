import { apiService as api } from 'app/store/apiService';

export const addTagTypes = [
	'messenger_employees',
	'messenger_employee',
	'messenger_chats',
	'messenger_chat',
	'messenger_user_profile'
];
const MessengerApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getMessengerEmployees: build.query({
				query: () => ({ url: `/mock-api/messenger/employees` }),
				providesTags: ['messenger_employees']
			}),
			getMessengerEmployee: build.query({
				query: (queryArg) => ({ url: `/mock-api/messenger/employees/${queryArg}` }),
				providesTags: ['messenger_employee']
			}),
			updateMessengerEmployee: build.mutation({
				query: (queryArg) => ({
					url: `/mock-api/messenger/employees/${queryArg.id}`,
					method: 'PUT',
					data: queryArg
				}),
				invalidatesTags: ['messenger_employee']
			}),
			deleteMessengerEmployee: build.mutation({
				query: (queryArg) => ({
					url: `/mock-api/messenger/employees/${queryArg}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['messenger_employee']
			}),
			getMessengerChats: build.query({
				query: () => ({ url: `/mock-api/messenger/chats` }),
				providesTags: ['messenger_chats']
			}),
			getMessengerChat: build.query({
				query: (queryArg) => ({ url: `/mock-api/messenger/chats/${queryArg}` }),
				providesTags: ['messenger_chat']
			}),
			deleteMessengerChat: build.mutation({
				query: (queryArg) => ({
					url: `/mock-api/messenger/chats/${queryArg}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['messenger_chats']
			}),
			sendMessengerMessage: build.mutation({
				query: (queryArg) => ({
					url: `/mock-api/messenger/chats/${queryArg.employeeId}`,
					method: 'POST',
					data: queryArg.message
				}),
				invalidatesTags: ['messenger_chat', 'messenger_chats']
			}),
			getMessengerUserProfile: build.query({
				query: () => ({ url: `/mock-api/messenger/profile` }),
				providesTags: ['messenger_user_profile']
			}),
			updateMessengerUserProfile: build.mutation({
				query: (queryArg) => ({
					url: `/mock-api/messenger/profile`,
					method: 'PUT',
					data: queryArg
				}),
				invalidatesTags: ['messenger_user_profile']
			})
		}),
		overrideExisting: false
	});
export default MessengerApi;
export const {
	useGetMessengerEmployeesQuery,
	useGetMessengerEmployeeQuery,
	useUpdateMessengerEmployeeMutation,
	useDeleteMessengerEmployeeMutation,
	useGetMessengerChatsQuery,
	useGetMessengerChatQuery,
	useDeleteMessengerChatMutation,
	useGetMessengerUserProfileQuery,
	useUpdateMessengerUserProfileMutation,
	useSendMessengerMessageMutation
} = MessengerApi;
