<script setup lang="ts">
import { defineBlock } from '@bagelink/blox'
import { defineSchema, $ } from '@bagelink/vue'

interface Quote { quote?: string; name?: string; detail?: string }
interface Props { kicker?: string; heading?: string; items?: Quote[] }

const schema = defineSchema<Props>({
	kicker: $.text('Kicker'),
	heading: $.text('Heading'),
	items: $.array('Quotes', defineSchema({
		quote: $.textarea('Quote'),
		name: $.text('Name'),
		detail: $.text('Detail'),
	}), { collapsible: true, allowReorder: true }),
})

defineBlock({
	name: 'QuoteList',
	label: 'Quotes',
	icon: 'format_quote',
	category: 'content',
	order: 50,
	description: 'Short quotes on paper cards.',
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
			<ul class="bare grid grid-wrap-3 m_grid-wrap-1 gap-1 mt-3">
				<li v-for="(item, i) in props.items" :key="item.name || i" class="sheet p-1-5">
					<p class="line-height-15 m-0">“{{ item.quote }}”</p>
					<p class="sans txt14 quiet m-0 mt-1">{{ item.name }}<span v-if="item.detail"> · {{ item.detail }}</span></p>
				</li>
			</ul>
		</div>
	</section>
</template>
