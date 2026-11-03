/**
 * Prerender entry — used by blox-ssg at build time only.
 */
import process from 'node:process'
import { createBloxSSREntry } from '@bagelink/blox/ssg'
import { BagelVue, RouterWrapper } from '@bagelink/vue'
import App from './App.vue'
import { createRouter as buildRouter } from './router'

function createRouter(mode: 'web' | 'memory' = 'web', initialUrl?: string) {
	const router = buildRouter(mode, initialUrl)
	const original = router.addRoute.bind(router)
	router.addRoute = ((parent: unknown, route?: unknown) => {
		if (route === undefined && parent && typeof parent === 'object') {
			return original('layout', parent as never)
		}
		return original(parent as never, route as never)
	}) as typeof router.addRoute
	return router
}

const blocks = import.meta.glob('./components/blocks/*.vue', { eager: true })

const websiteName = process.env.BLOX_WEBSITE_NAME ?? process.env.WEBSITE_NAME ?? 'Clarity'

export const { render } = createBloxSSREntry({
	rootComponent: App,
	createRouter,
	modules: blocks as Record<string, any>,
	websiteName,
	store: websiteName,
	apiBase: process.env.BLOX_API_URL ?? process.env.BAGELINK_API_URL ?? 'https://api.bagel.to',
	plugins: [[BagelVue, {}]],
	globalComponents: { RouterWrapper },
})
