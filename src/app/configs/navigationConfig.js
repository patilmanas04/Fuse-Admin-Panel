import i18next from 'i18next';
import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);
/**
 * The navigationConfig object is an array of navigation items for the Fuse application.
 */
const navigationConfig = [
	{
		id: 'Profile',
		title: 'Profile',
		type: 'group',
		icon: 'heroicons-outline:home',
		children: [
			{
				id: 'myprofile',
				title: 'My Profile',
				type: 'item',
				icon: 'heroicons-outline:user-circle',
				url: 'apps/profile',
			},
		]
	},
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
				url: 'dashboards/project',
			},
			{
				id: 'dashboards.analytics',
				title: 'Analytics',
				type: 'item',
				icon: 'heroicons-outline:chart-pie',
				url: 'dashboards/analytics',
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
				id: 'applications.pos',
				title: 'POS',
				type: 'collapse',
				icon: 'heroicons-outline:shopping-bag',
				children: [
					{
						id: 'applications.pos.membership',
						title: 'Membership',
						type: 'item',
						icon: 'material-outline:receipt_long',
						url: 'apps/pos/membership',
					},
					{
						id: 'applications.pos.personaltrainer',
						title: 'Personal Trainer',
						type: 'item',
						icon: 'heroicons-outline:user',
						url: 'apps/pos/personaltrainer',
					},
					{
						id: 'applications.pos.products',
						title: 'Products',
						type: 'item',
						icon: 'heroicons-outline:shopping-cart',
						url: 'apps/pos/products',
					},
					{
						id: 'applications.pos.bodyanalysis',
						title: 'Body Analysis',
						type: 'item',
						icon: 'heroicons-outline:scale',
						url: 'apps/pos/bodyanalysis',
					},
				]
			},
			{
				id: 'applications.employees',
				title: 'Employees',
				type: 'item',
				url: 'apps/employees',
				icon: 'heroicons-outline:user-group',
			},
			{
				id: 'applications.clients',
				title: 'Clients',
				type: 'item',
				url: 'apps/clients',
				icon: 'heroicons-outline:user',
			},
			{
				id: 'applications.chats',
				title: 'Chats',
				type: 'item',
				url: 'apps/messenger',
				icon: 'heroicons-outline:chat',
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
						icon: 'heroicons-outline:information-circle',
						url: 'apps/crm/inquiries',
					},
					{
						id: 'applications.crm.deals',
						title: 'Deals',
						type: 'item',
						icon: 'material-outline:business_center',
						url: 'apps/crm/deals',
					},
					{
						id: 'applications.crm.totalpayments',
						title: 'Total Payments',
						type: 'item',
						icon: 'heroicons-outline:currency-rupee',
						url: 'apps/crm/totalpayments',
					},
				]
			},
			{
				id: 'applications.sendnotification',
				title: 'Send Notification',
				type: 'item',
				url: 'apps/sendnotification',
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
						icon: 'heroicons-outline:plus',
						url: 'apps/projectmanagement/createaplan',
					},
					{
						id: 'applications.projectmanagement.createaprogram',
						title: 'Create a Program',
						type: 'item',
						icon: 'material-solid:playlist_add',
						url: 'apps/projectmanagement/createaprogram',
					},
				]
			},
			{
				id: 'applications.productmanagement',
				title: 'Product Management',
				type: 'collapse',
				icon: 'heroicons-outline:archive',
				children: [
					{
						id: 'applications.productmanagement.photo-tracking',
						title: 'Photo Tracking',
						type: 'item',
						icon: 'heroicons-outline:camera',
						url: 'apps/photo-tracking',
					},
					{
						id: 'applications.productmanagement.inventory',
						title: 'Inventory',
						type: 'item',
						icon: 'heroicons-outline:shopping-cart',
						url: 'apps/e-commerce/products',
					},
					{
						id: 'applications.productmanagement.',
						title: 'Suppliers',
						type: 'item',
						icon: 'heroicons-outline:user-group',
						url: 'apps/e-commerce/orders',
					},
				]
			},
			{
				id: 'applications.shifts',
				title: 'Shifts',
				type: 'item',
				url: 'apps/notes',
				icon: 'heroicons-outline:clock',
			},
			{
				id: 'applications.schedule',
				title: 'Schedule',
				type: 'collapse',
				icon: 'material-outline:calendar_today',
				children: [
					{
						id: 'applications.schedule.diet-session',
						title: 'Diet Session',
						type: 'item',
						icon: 'heroicons-outline:clock',
						url: 'apps/schedule/diet-session',
					},
					{
						id: 'applications.schedule.water-intake',
						title: 'Water Intake',
						type: 'item',
						icon: 'material-outline:water_drop',
						url: 'apps/schedule/water-intake',
					},
					{
						id: 'applications.schedule.sleep-session',
						title: 'Sleep Session',
						type: 'item',
						icon: 'heroicons-outline:moon',
						url: 'apps/schedule/sleep-session',
					},
					{
						id: 'applications.schedule.diet-plan',
						title: 'Diet Plan',
						type: 'item',
						icon: 'material-outline:food_bank',
						url: 'apps/schedule/diet-plan',
					},
					{
						id: 'applications.schedule.exercise-schedule',
						title: 'Exercise Schedule',
						type: 'item',
						icon: 'heroicons-outline:sparkles',
						url: 'apps/schedule/exercise-schedule',
					},
					{
						id: 'applications.schedule.apponitment-schedule',
						title: 'Appointment Schedule',
						type: 'item',
						icon: 'heroicons-outline:calendar',
						url: 'apps/schedule/apponitment-schedule',
					},
				]
			},
			{
				id: 'applications.reports',
				title: 'Reports',
				type: 'item',
				url: 'apps/mailbox',
				icon: 'heroicons-outline:flag',
			},
			{
				id: 'applications.expenses',
				title: 'Expenses',
				type: 'item',
				url: 'apps/finance',
				icon: 'heroicons-outline:currency-rupee',
			},
			{
				id: 'applications.bodyassessmentreports',
				title: 'Body Assessment Reports',
				type: 'item',
				url: 'apps/bodyassessmentreports',
				icon: 'heroicons-outline:document-report',
			},
			{
				id: 'applications.classes',
				title: 'Classes',
				type: 'item',
				url: 'apps/classes',
				icon: 'heroicons-outline:academic-cap',
			},
			{
				id: 'applications.membership',
				title: 'Membership',
				type: 'collapse',
				icon: 'heroicons-outline:user-group',
				children: [
					{
						id: 'applications.membership.gym-membership',
						title: 'Gym Membership',
						type: 'item',
						icon: 'material-outline:receipt_long',
						url: 'apps/membership/gym-membership',
					},
				]
			},
			{
				id: 'applications.assessment-form',
				title: 'Assessment Form',
				type: 'item',
				url: 'apps/assessment-form',
				icon: 'heroicons-outline:document-text',
			},
			{
				id: 'applications.events',
				title: 'Events',
				type: 'item',
				url: 'apps/calendar',
				icon: 'heroicons-outline:calendar',
			},
		],
	}
];

export default navigationConfig;