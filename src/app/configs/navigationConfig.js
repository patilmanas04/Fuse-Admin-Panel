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
	// {
	// 	id: 'example-component',
	// 	title: 'Example',
	// 	translate: 'EXAMPLE',
	// 	type: 'item',
	// 	icon: 'heroicons-outline:star',
	// 	url: 'example'
	// }
        {
          id: 'dashboards',
          title: 'Dashboards',
          subtitle: 'Unique dashboard designs',
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
          id: 'auth',
          title: 'Auth',
          type: 'group',
          icon: 'verified_user',
          children: [
            {
              id: 'sign-out',
              title: 'Sign out',
              type: 'item',
              url: 'sign-out',
              icon: 'exit_to_app',
            },
          ],
        }
];
export default navigationConfig;
