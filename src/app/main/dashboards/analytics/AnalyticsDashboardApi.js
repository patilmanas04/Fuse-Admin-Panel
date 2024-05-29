import { apiService as api } from 'app/store/apiService';
import { rootReducer } from 'app/store/lazyLoadedSlices';

export const addTagTypes = ['analytics_dashboard_widgets'];
const AnalyticsDashboardApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getAnalyticsDashboardWidgets: build.query({
				query: () => ({ url: `/mock-api/dashboards/analytics/widgets` }),
				providesTags: ['analytics_dashboard_widgets']
			})
		}),
		overrideExisting: false
	});
export default AnalyticsDashboardApi;
export const { useGetAnalyticsDashboardWidgetsQuery } = AnalyticsDashboardApi;
export const selectWidget = (id) =>
	rootReducer.selector((state) => {
		const widgets = AnalyticsDashboardApi.endpoints.getAnalyticsDashboardWidgets.select()(state)?.data;
		return widgets?.[id];
	});
