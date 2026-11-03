import { createRouter as _createRouter, createWebHistory, createMemoryHistory } from 'vue-router'
import Layout from '@/components/Layout.vue'

export function createRouter(mode: 'web' | 'memory' = 'web', _initialUrl?: string) {
	const history = mode === 'memory'
		? createMemoryHistory()
		: createWebHistory(import.meta.env.BASE_URL)

	const router = _createRouter({
		history,
		routes: [
			{
				path: '/',
				component: Layout,
				children: [
					{ path: ':pathMatch(.*)*', component: { template: '<div />' } },
				],
			},
		],
		scrollBehavior() {
			return { top: 0 }
		},
	})

	return router
}

export default createRouter()
