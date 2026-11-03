<script setup lang="ts">
import { defineBlock } from '@bagelink/blox'
import { defineSchema, $ } from '@bagelink/vue'

interface Card { title?: string; text?: string; image?: string; meta?: string }
interface Props { kicker?: string; heading?: string; intro?: string; items?: Card[] }

const schema = defineSchema<Props>({
	kicker: $.text('Kicker'),
	heading: $.text('Heading'),
	intro: $.textarea('Intro'),
	items: $.array('Cards', defineSchema({
		title: $.text('Title'),
		text: $.textarea('Text'),
		image: $.text('Image'),
		meta: $.text('Meta'),
	}), { collapsible: true, allowReorder: true }),
})

defineBlock({
	name: 'CardGrid',
	label: 'Card grid',
	icon: 'dashboard',
	category: 'content',
	order: 40,
	description: 'Image cards. Image values are asset URLs.',
	schema,
	defaults: { items: [] },
})

const props = withDefaults(defineProps<Props>(), { items: () => [] })
</script>

<template>
	<section class="px-2 m_px-1 py-4">
		<div class="w-1100px mx-auto">
			<p v-if="props.kicker" class="sans txt12 uppercase tracking-wider quiet m-0 mb-1">{{ props.kicker }}</p>
			<h2 class="txt-36 line-height-11 m-0">{{ props.heading }}</h2>
			<p v-if="props.intro" class="sans line-height-15 measure m-0 mt-1">{{ props.intro }}</p>
			<ul class="bare grid grid-wrap-4 m_grid-wrap-2 gap-2 mt-3">
				<li v-for="(item, i) in props.items" :key="item.title || i">
					<div v-if="item.image" class="frame">
						<img :src="item.image" :alt="item.title || ''" />
					</div>
					<p v-if="item.meta" class="sans txt12 quiet m-0 mt-075">{{ item.meta }}</p>
					<h3 class="txt-20 m-0 mt-025">{{ item.title }}</h3>
					<p v-if="item.text" class="sans txt14 quiet m-0 mt-025">{{ item.text }}</p>
				</li>
			</ul>
		</div>
	</section>
</template>
