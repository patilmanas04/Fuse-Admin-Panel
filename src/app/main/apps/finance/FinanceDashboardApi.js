import { createSelector } from '@reduxjs/toolkit';
import { apiService as api } from 'app/store/apiService';

export const addTagTypes = ['finance_dashboard_widgets'];
const FinanceDashboardApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getFinanceDashboardWidgets: build.query({
				query: () => ({ url: `/mock-api/dashboards/finance/widgets` }),
				providesTags: ['finance_dashboard_widgets']
			})
		}),
		overrideExisting: false
	});
export default FinanceDashboardApi;
export const { useGetFinanceDashboardWidgetsQuery } = FinanceDashboardApi;
export const selectFinanceDashboardWidgets = createSelector(
	FinanceDashboardApi.endpoints.getFinanceDashboardWidgets.select(),
	(results) => results.data
);
export const selectWidget = (id) =>
	createSelector(selectFinanceDashboardWidgets, (widgets) => {
		return widgets?.[id];
	});
