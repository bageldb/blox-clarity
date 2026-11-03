<script setup lang="ts">
import { defineBlock } from '@bagelink/blox'
import { defineSchema, $ } from '@bagelink/vue'

interface Props {
	kicker?: string
	heading?: string
	intro?: string
	items?: Array<{
		title?: string
		category?: string
		carat?: string
		sale_price?: string | number
		image?: string
		slug?: string
		description?: string
	}>
}

const schema = defineSchema<Props>({
	kicker: $.text('Kicker'),
	heading: $.text('Heading'),
	intro: $.textarea('Intro'),
	items: $.array('Sold pieces', defineSchema({
		title: $.text('Title'),
		category: $.text('Category'),
		carat: $.text('Carat'),
		sale_price: $.text('Sale price'),
		image: $.text('Image'),
		slug: $.text('Slug'),
		description: $.textarea('Description'),
	}), { collapsible: true, allowReorder: true }),
})

defineBlock({
	name: 'SoldExamples',
	label: 'Sold examples',
	icon: 'collections',
	category: 'content',
	description: 'Gallery of sold diamonds and jewellery bound to the sold-examples datastore collection.',
	schema,
	defaults: { items: [] },
})

const props = withDefaults(defineProps<Props>(), { items: () => [] })

function price(value: string | number | undefined) {
	if (value === undefined || value === null || value === '') return ''
	const n = typeof value === 'number' ? value : Number(value)
	if (Number.isFinite(n)) return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n)
	return String(value)
}
</script>

<template>
	<section class="px-2 m_px-1 py-4">
		<div class="w-1100px mx-auto">
			<p v-if="props.kicker" class="sans txt14 tracking-wide m-0 mb-1">{{ props.kicker }}</p>
			<h2 class="txt-36 line-height-11 m-0">{{ props.heading }}</h2>
			<p v-if="props.intro" class="sans line-height-15 measure m-0 mt-1">{{ props.intro }}</p>
			<ul class="bare grid grid-wrap-4 m_grid-wrap-1 gap-2 mt-2">
				<li v-for="(item, i) in props.items" :key="item.slug || item.title || i">
					<div v-if="item.image" class="frame">
						<img :src="item.image" :alt="item.title || ''" />
					</div>
					<p v-if="item.category" class="sans txt14 quiet m-0 mt-075">{{ item.category }}</p>
					<h3 class="txt-20 m-0 mt-025">{{ item.title }}</h3>
					<p class="sans m-0 mt-025">
						<span v-if="item.carat">{{ item.carat }}</span>
						<span v-if="item.carat && item.sale_price"> · </span>
						<span v-if="item.sale_price">{{ price(item.sale_price) }}</span>
					</p>
					<p v-if="item.description" class="sans txt14 line-height-15 m-0 mt-075">{{ item.description }}</p>
				</li>
			</ul>
		</div>
	</section>
</template>
