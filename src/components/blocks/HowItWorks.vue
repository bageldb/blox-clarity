<script setup lang="ts">
import { defineBlock } from '@bagelink/blox'
import { defineSchema, $ } from '@bagelink/vue'

interface Props {
	kicker?: string
	heading?: string
	intro?: string
	steps?: Array<{ title?: string; text?: string }>
	cta_label?: string
	cta_href?: string
}

const schema = defineSchema<Props>({
	kicker: $.text('Kicker'),
	heading: $.text('Heading'),
	intro: $.textarea('Intro'),
	steps: $.array('Steps', defineSchema({ title: $.text('Title'), text: $.textarea('Text') }), { collapsible: true, allowReorder: true }),
	cta_label: $.text('CTA label'),
	cta_href: $.text('CTA href'),
})

defineBlock({
	name: 'HowItWorks',
	label: 'How it works',
	icon: 'timeline',
	category: 'content',
	description: 'Numbered four-step sale process.',
	schema,
	defaults: { steps: [] },
})

const props = withDefaults(defineProps<Props>(), { steps: () => [] })
</script>

<template>
	<section class="px-2 m_px-1 py-4">
		<div class="w-1100px mx-auto">
			<p v-if="props.kicker" class="sans txt14 tracking-wide m-0 mb-1">{{ props.kicker }}</p>
			<h2 class="txt-36 line-height-11 m-0">{{ props.heading }}</h2>
			<p v-if="props.intro" class="sans line-height-15 measure m-0 mt-1">{{ props.intro }}</p>
			<ol class="bare grid grid-wrap-4 m_grid-wrap-1 gap-2 mt-2">
				<li v-for="(step, i) in props.steps" :key="step.title || i" class="border-top pt-1">
					<p class="sans txt14 m-0">{{ String(i + 1).padStart(2, '0') }}</p>
					<h3 class="txt-22 m-0 mt-05">{{ step.title }}</h3>
					<p class="sans line-height-15 m-0 mt-075">{{ step.text }}</p>
				</li>
			</ol>
			<p v-if="props.cta_label" class="mt-2 m-0">
				<a class="bgl_btn" :href="props.cta_href || '/contact'">{{ props.cta_label }}</a>
			</p>
		</div>
	</section>
</template>
