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

	if (to.name === 'lookup')
		document.title = `${to.params.host} • ${__APP_INSTANCE_NAME__}`;
	else
		document.title = __APP_INSTANCE_NAME__;
});

router.beforeEach(() => {
	const lightbox = useLightboxStore(pinia);
	if (lightbox.hasImage) {
		lightbox.clearImage();
		return false;
	}
});

export default router;
