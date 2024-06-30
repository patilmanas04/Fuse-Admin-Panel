import { createSelector } from '@reduxjs/toolkit';
import { apiService as api } from 'app/store/apiService';
import FuseUtils from '@fuse/utils';
import { selectSearchText } from './employeesAppSlice';

export const addTagTypes = ['employees_item', 'employees', 'employees_tag', 'employees_tags', 'countries'];
const EmployeesApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getEmployeesList: build.query({
				query: () => ({ url: `/mock-api/employees` }),
				providesTags: ['employees']
			}),
			createEmployeesItem: build.mutation({
				query: (queryArg) => ({
					url: `/mock-api/employees`,
					method: 'POST',
					data: queryArg.employee
				}),
				invalidatesTags: ['employees']
			}),
			getEmployeesItem: build.query({
				query: (employeeId) => ({ url: `/mock-api/employees/${employeeId}` }),
				providesTags: ['employees_item']
			}),
			updateEmployeesItem: build.mutation({
				query: (employee) => ({
					url: `/mock-api/employees/${employee.id}`,
					method: 'PUT',
					data: employee
				}),
				invalidatesTags: ['employees_item', 'employees']
			}),
			deleteEmployeesItem: build.mutation({
				query: (employeeId) => ({
					url: `/mock-api/employees/${employeeId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['employees']
			}),
			getEmployeesTag: build.query({
				query: (tagId) => ({ url: `/mock-api/employees/tags/${tagId}` }),
				providesTags: ['employees_tag']
			}),
			updateEmployeesTag: build.mutation({
				query: (tag) => ({
					url: `/mock-api/employees/tags/${tag.id}`,
					method: 'PUT',
					body: tag
				}),
				invalidatesTags: ['employees_tags']
			}),
			deleteEmployeesTag: build.mutation({
				query: (tagId) => ({
					url: `/mock-api/employees/tags/${tagId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['employees_tags']
			}),
			getEmployeesTags: build.query({
				query: () => ({ url: `/mock-api/employees/tags` }),
				providesTags: ['employees_tags']
			}),
			getEmployeesCountries: build.query({
				query: () => ({ url: `/mock-api/countries` }),
				providesTags: ['countries']
			}),
			createEmployeesTag: build.mutation({
				query: (queryArg) => ({
					url: `/mock-api/employees/tags`,
					method: 'POST',
					body: queryArg.tag
				}),
				invalidatesTags: ['employees_tags']
			})
		}),
		overrideExisting: false
	});
export default EmployeesApi;
export const {
	useGetEmployeesItemQuery,
	useUpdateEmployeesItemMutation,
	useDeleteEmployeesItemMutation,
	useGetEmployeesListQuery,
	useCreateEmployeesItemMutation,
	useGetEmployeesTagQuery,
	useGetEmployeesCountriesQuery,
	useUpdateEmployeesTagMutation,
	useDeleteEmployeesTagMutation,
	useGetEmployeesTagsQuery,
	useCreateEmployeesTagMutation
} = EmployeesApi;
/**
 * Select filtered employees
 */
export const selectFilteredEmployeeList = (employees) =>
	createSelector([selectSearchText], (searchText) => {
		if (!employees) {
			return [];
		}

		if (searchText.length === 0) {
			return employees;
		}

		return FuseUtils.filterArrayByString(employees, searchText);
	});
/**
 * Select grouped employees
 */
export const selectGroupedFilteredEmployees = (employees) =>
	createSelector([selectFilteredEmployeeList(employees)], (employees) => {
		if (!employees) {
			return [];
		}

		const sortedEmployees = [...employees]?.sort((a, b) =>
			a?.name?.localeCompare(b.name, 'es', { sensitivity: 'base' })
		);
		const groupedObject = sortedEmployees?.reduce((r, e) => {
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
