import i18next from 'i18next';
import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';
import { id } from 'date-fns/locale';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);
/**
 * The navigationConfig object is an array of navigation items for the Fuse application.
 */
const navigationConfig = [
	{
		id: 'dashboards',
		title: 'Dashboards',
		subtitle: '',
		type: 'group',
		icon: 'heroicons-outline:home',
		children: [
			{
				id: 'dashboards.project',
				title: 'Project',
				type: 'item',
				icon: 'heroicons-outline:clipboard-check',
				url: '/dashboards/project',
			},
			{
				id: 'dashboards.analytics',
				title: 'Analytics',
				type: 'item',
				icon: 'heroicons-outline:chart-pie',
				url: '/dashboards/analytics',
			},
		],
	},
	{
		id: 'applications',
		title: 'Applications',
		type: 'group',
		icon: 'verified_user',
		children: [
			{
				id: 'applications.employees',
				title: 'Employees',
				type: 'item',
				url: '/apps/employees',
				icon: 'heroicons-outline:user-group',
			},
			{
				id: 'applications.clients',
				title: 'Clients',
				type: 'item',
				url: '/apps/clients',
				icon: 'heroicons-outline:user',
			},
			{
				id: 'applications.crm',
				title: 'CRM',
				type: 'collapse',
				icon: 'heroicons-outline:user-group',
				children: [
					{
						id: 'applications.crm.inquiries',
						title: 'Inquiries',
						type: 'item',
						url: '/apps/crm/inquiries',
					},
					{
						id: 'applications.crm.deals',
						title: 'Deals',
						type: 'item',
						url: '/apps/crm/deals',
					},
					{
						id: 'applications.crm.totalpayments',
						title: 'Total Payments',
						type: 'item',
						url: '/apps/crm/totalpayments',
					},
				]
			},
			{
				id: 'applications.sendnotification',
				title: 'Send Notification',
				type: 'item',
				url: '/apps/sendnotification',
				icon: 'heroicons-outline:bell',
			},
			{
				id: 'applications.projectmanagement',
				title: 'Project Management',
				type: 'collapse',
				icon: 'heroicons-outline:clipboard-list',
				children: [
					{
						id: 'applications.projectmanagement.createaplan',
						title: 'Create a Plan',
						type: 'item',
						url: '/apps/projectmanagement/createaplan',
					},
					{
						id: 'applications.projectmanagement.createaprogram',
						title: 'Create a Program',
						type: 'item',
						url: '/apps/projectmanagement/createaprogram',
					},
				]
			},
			{
				id: 'applications.phototracking',
				title: 'Photo Tracking',
				type: 'item',
				url: '/apps/phototracking',
				icon: 'heroicons-outline:camera',
			},
			{
				id: 'applications.shifts',
				title: 'Shifts',
				type: 'item',
				url: '/apps/shifts',
				icon: 'heroicons-outline:clock',
			},
			{
				id: 'applications.reports',
				title: 'Reports',
				type: 'item',
				url: '/apps/reports',
				icon: 'heroicons-outline:flag',
			},
			{
				id: 'applications.inventory',
				title: 'Inventory',
				type: 'item',
				url: '/apps/inventory',
				icon: 'heroicons-outline:archive',
			},
			{
				id: 'applications.expenses',
				title: 'Expenses',
				type: 'item',
				url: '/apps/expenses',
				icon: 'heroicons-outline:currency-dollar',
			},
			{
				id: 'applications.bodyassessmentreports',
				title: 'Body Assessment Reports',
				type: 'item',
				url: '/apps/bodyassessmentreports',
				icon: 'heroicons-outline:document-report',
			},
			{
				id: 'applications.classes',
				title: 'Classes',
				type: 'item',
				url: '/apps/classes',
				icon: 'heroicons-outline:academic-cap',
			},
			{
				id: 'applications.membership',
				title: 'Membership',
				type: 'collapse',
				icon: 'heroicons-outline:user-group',
				children: [
					{
						id: 'applications.membership.gymmembership',
						title: 'Gym Membership',
						type: 'item',
						url: '/apps/membership/gymmembership',
					},
				]
			},
			{
				id: 'applications.assessmentform',
				title: 'Assessment Form',
				type: 'item',
				url: '/apps/assessmentform',
				icon: 'heroicons-outline:document-text',
			},
			{
				id: 'applications.events',
				title: 'Events',
				type: 'item',
				url: '/apps/events',
				icon: 'heroicons-outline:calendar',
			},
		],
	}
];
export default navigationConfig;
