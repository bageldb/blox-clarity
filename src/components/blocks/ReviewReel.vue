<script setup lang="ts">
import { defineBlock } from '@bagelink/blox'
import { defineSchema, $ } from '@bagelink/vue'

interface Props {
	kicker?: string
	heading?: string
	items?: Array<{ name?: string; quote?: string; image?: string; rating?: string | number }>
}

const schema = defineSchema<Props>({
	kicker: $.text('Kicker'),
	heading: $.text('Heading'),
	items: $.array('Reviews', defineSchema({
		name: $.text('Name'),
		quote: $.textarea('Quote'),
		image: $.text('Image'),
		rating: $.text('Rating'),
	}), { collapsible: true, allowReorder: true }),
})

defineBlock({
	name: 'ReviewReel',
	label: 'Review reel',
	icon: 'format_quote',
	category: 'content',
	description: 'Client reviews with portrait and quote, bound to the reviews datastore collection.',
	schema,
	defaults: { items: [] },
})

const props = withDefaults(defineProps<Props>(), { items: () => [] })
</script>

<template>
	<section class="px-2 m_px-1 py-4">
		<div class="w-1100px mx-auto">
			<p v-if="props.kicker" class="sans txt14 tracking-wide m-0 mb-1">{{ props.kicker }}</p>
			<h2 class="txt-36 line-height-11 m-0">{{ props.heading }}</h2>
			<ul class="bare grid-wrap-4 m_grid-wrap-1 gap-2 mt-2">
				<li v-for="(item, i) in props.items" :key="item.name || i" class="border-top pt-1">
					<img v-if="item.image" :src="item.image" :alt="item.name" class="photo" />
					<p v-if="item.quote" class="sans line-height-15 m-0 mt-1">“{{ item.quote }}”</p>
					<p class="sans txt14 m-0 mt-075">
						<strong>{{ item.name }}</strong>
						<span v-if="item.rating"> · {{ item.rating }}/5</span>
					</p>
				</li>
			</ul>
		</div>
	</section>
</template>
