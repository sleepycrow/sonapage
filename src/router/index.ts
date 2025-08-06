import { createRouter, createWebHistory, isNavigationFailure } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import LookupView from '@/views/LookupView.vue';
import { useLightboxStore } from '@/stores/lightbox';
import { pinia } from '@/stores';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: HomeView,
		},
		{
			path: '/:host',
			name: 'lookup',
			component: LookupView
		},
	],
});

router.afterEach((to, _from, failure) => {
	if (isNavigationFailure(failure)) return;

	const appName = import.meta.env.VITE_APP_NAME;
	if (to.name === 'lookup')
		document.title = `${to.params.host} • ${appName}`;
	else
		document.title = appName;
});

router.beforeEach(() => {
	const lightbox = useLightboxStore(pinia);
	if (lightbox.hasImage) {
		lightbox.clearImage();
		return false;
	}
});

export default router;
