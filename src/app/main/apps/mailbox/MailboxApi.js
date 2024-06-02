import { apiService as api } from 'app/store/apiService';

export const addTagTypes = [
	'mailbox_mail',
	'mailbox_mails',
	'mailbox_filters',
	'mailbox_labels',
	'mailbox_label',
	'mailbox_folders'
];
const MailboxApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getMailboxMails: build.query({
				query: (routeParams) => {
					let url = '/mock-api/mailbox/mails/';

					if (routeParams) {
						if (routeParams.folderHandle) {
							url += routeParams.folderHandle;
						}

						if (routeParams.labelHandle) {
							url += `labels/${routeParams.labelHandle}`;
						}

						if (routeParams.filterHandle) {
							url += `filters/${routeParams.filterHandle}`;
						}
					}

					return {
						url
					};
				},
				providesTags: ['mailbox_mails']
			}),
			getMailboxMail: build.query({
				query: (mailId) => ({
					url: `/mock-api/mailbox/mail/${mailId}`
				}),
				providesTags: ['mailbox_mail']
			}),
			applyMailboxMailAction: build.mutation({
				query: (queryArg) => ({
					url: `/mock-api/mailbox/mails/actions`,
					method: 'POST',
					data: queryArg
				}),
				invalidatesTags: ['mailbox_mails', 'mailbox_mail']
			}),
			createMailboxMail: build.mutation({
				query: (queryArg) => ({
					url: `/mock-api/mailbox/mails/${queryArg.folderSlug}`,
					method: 'POST',
					data: queryArg.mail
				}),
				invalidatesTags: ['mailbox_mails']
			}),
			getMailboxMailsByLabel: build.query({
				query: (queryArg) => ({
					url: `/mock-api/mailbox/mails/labels/${queryArg.labelSlug}`
				}),
				providesTags: ['mailbox_mails']
			}),
			getMailboxMailsByFilter: build.query({
				query: (queryArg) => ({
					url: `/mock-api/mailbox/mails/filters/${queryArg.filterSlug}`
				}),
				providesTags: ['mailbox_mails']
			}),
			getMailboxFilters: build.query({
				query: () => ({ url: `/mock-api/mailbox/filters` }),
				providesTags: ['mailbox_filters']
			}),
			getMailboxLabels: build.query({
				query: () => ({ url: `/mock-api/mailbox/labels` }),
				providesTags: ['mailbox_labels']
			}),
			updateMailboxLabel: build.mutation({
				query: (queryArg) => ({
					url: `/mock-api/mailbox/labels/${queryArg.labelSlug}`,
					method: 'PUT',
					data: queryArg.label
				}),
				invalidatesTags: ['mailbox_label', 'mailbox_labels']
			}),
			getMailboxFolders: build.query({
				query: () => ({ url: `/mock-api/mailbox/folders` }),
				providesTags: ['mailbox_folders']
			})
		}),
		overrideExisting: false
	});
export default MailboxApi;
export const {
	useGetMailboxMailsQuery,
	useApplyMailboxMailActionMutation,
	useCreateMailboxMailMutation,
	useGetMailboxMailsByLabelQuery,
	useGetMailboxMailsByFilterQuery,
	useGetMailboxFiltersQuery,
	useGetMailboxLabelsQuery,
	useUpdateMailboxLabelMutation,
	useGetMailboxFoldersQuery,
	useGetMailboxMailQuery
} = MailboxApi;
