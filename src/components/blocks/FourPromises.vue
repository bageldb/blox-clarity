<script setup lang="ts">
import { defineBlock } from '@bagelink/blox'
import { defineSchema, $ } from '@bagelink/vue'

interface Props {
	kicker?: string
	heading?: string
	intro?: string
	items?: Array<{ title?: string; text?: string }>
}

const schema = defineSchema<Props>({
	kicker: $.text('Kicker'),
	heading: $.text('Heading'),
	intro: $.textarea('Intro'),
	items: $.array('Promises', defineSchema({ title: $.text('Title'), text: $.textarea('Text') }), { collapsible: true, allowReorder: true }),
})

defineBlock({
	name: 'FourPromises',
	label: 'Four promises',
	icon: 'grid_view',
	category: 'content',
	description: 'Four-promise grid used on home and why-sell pages.',
	schema,
	defaults: { items: [] },
})

const props = withDefaults(defineProps<Props>(), { items: () => [] })
</script>

<template>
	<section class="px-2 m_px-1 py-4">
		<div class="w-1100px mx-auto">
			<p v-if="props.kicker" class="txt12 uppercase tracking-wider quiet m-0 mb-1">{{ props.kicker }}</p>
			<h2 class="txt-32 line-height-12 m-0">{{ props.heading }}</h2>
			<p v-if="props.intro" class="line-height-15 measure m-0 mt-1">{{ props.intro }}</p>
			<ul class="bare grid grid-2-col m_grid-wrap-1 gap-1 mt-2">
				<li v-for="(item, i) in props.items" :key="item.title || i" class="panel">
					<h3 class="txt-20 m-0">{{ item.title }}</h3>
					<p class="line-height-15 quiet m-0 mt-05">{{ item.text }}</p>
				</li>
			</ul>
		</div>
	</section>
</template>
