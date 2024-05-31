import { createSelector } from '@reduxjs/toolkit';
import { apiService as api } from 'app/store/apiService';
import FuseUtils from '@fuse/utils';
import { selectSearchText } from './clientsAppSlice';

export const addTagTypes = ['clients_item', 'clients', 'clients_tag', 'clients_tags', 'countries'];
const ClientsApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getClientsList: build.query({
				query: () => ({ url: `/mock-api/clients` }),
				providesTags: ['clients']
			}),
			createClientsItem: build.mutation({
				query: (queryArg) => ({
					url: `/mock-api/clients`,
					method: 'POST',
					data: queryArg.client
				}),
				invalidatesTags: ['clients']
			}),
			getClientsItem: build.query({
				query: (clientId) => ({ url: `/mock-api/clients/${clientId}` }),
				providesTags: ['clients_item']
			}),
			updateClientsItem: build.mutation({
				query: (client) => ({
					url: `/mock-api/clients/${client.id}`,
					method: 'PUT',
					data: client
				}),
				invalidatesTags: ['clients_item', 'clients']
			}),
			deleteClientsItem: build.mutation({
				query: (clientId) => ({
					url: `/mock-api/clients/${clientId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['clients']
			}),
			getClientsTag: build.query({
				query: (tagId) => ({ url: `/mock-api/clients/tags/${tagId}` }),
				providesTags: ['clients_tag']
			}),
			updateClientsTag: build.mutation({
				query: (tag) => ({
					url: `/mock-api/clients/tags/${tag.id}`,
					method: 'PUT',
					body: tag
				}),
				invalidatesTags: ['clients_tags']
			}),
			deleteClientsTag: build.mutation({
				query: (tagId) => ({
					url: `/mock-api/clients/tags/${tagId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['clients_tags']
			}),
			getClientsTags: build.query({
				query: () => ({ url: `/mock-api/clients/tags` }),
				providesTags: ['clients_tags']
			}),
			getClientsCountries: build.query({
				query: () => ({ url: `/mock-api/countries` }),
				providesTags: ['countries']
			}),
			createClientsTag: build.mutation({
				query: (queryArg) => ({
					url: `/mock-api/clients/tags`,
					method: 'POST',
					body: queryArg.tag
				}),
				invalidatesTags: ['clients_tags']
			})
		}),
		overrideExisting: false
	});
export default ClientsApi;
export const {
	useGetClientsItemQuery,
	useUpdateClientsItemMutation,
	useDeleteClientsItemMutation,
	useGetClientsListQuery,
	useCreateClientsItemMutation,
	useGetClientsTagQuery,
	useGetClientsCountriesQuery,
	useUpdateClientsTagMutation,
	useDeleteClientsTagMutation,
	useGetClientsTagsQuery,
	useCreateClientsTagMutation
} = ClientsApi;
/**
 * Select filtered clients
 */
export const selectFilteredClientList = (clients) =>
	createSelector([selectSearchText], (searchText) => {
		if (!clients) {
			return [];
		}

		if (searchText.length === 0) {
			return clients;
		}

		return FuseUtils.filterArrayByString(clients, searchText);
	});
/**
 * Select grouped clients
 */
export const selectGroupedFilteredClients = (clients) =>
	createSelector([selectFilteredClientList(clients)], (clients) => {
		if (!clients) {
			return [];
		}

		const sortedClients = [...clients]?.sort((a, b) =>
			a?.name?.localeCompare(b.name, 'es', { sensitivity: 'base' })
		);
		const groupedObject = sortedClients?.reduce((r, e) => {
			// get first letter of name of current element
			const group = e.name[0];

			// if there is no property in accumulator with this letter create it
			if (!r[group]) r[group] = { group, children: [e] };
			// if there is push current element to children array for that letter
			else {
				r[group]?.children?.push(e);
			}

			// return accumulator
			return r;
		}, {});
		return groupedObject;
	});
