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
		id: 'apps.academy',
		title: 'Studies',
		type: 'item',
		icon: 'heroicons-outline:academic-cap',
		url: '/TA',
		translate: 'Studies'
	},
	{
		id: 'apps.academy1',
		title: 'Sources',
		type: 'item',
		icon: 'heroicons-outline:folder-open',
		url: '/apps/academy',
		translate: 'Sources'
	}
];
export default navigationConfig;
