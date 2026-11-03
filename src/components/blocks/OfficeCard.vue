<script setup lang="ts">
import { defineBlock } from '@bagelink/blox'
import { defineSchema, $ } from '@bagelink/vue'

interface Props {
	heading?: string
	office_name?: string
	address?: string
	phone?: string
	email?: string
	image?: string
	image_alt?: string
}

const schema = defineSchema<Props>({
	heading: $.text('Heading'),
	office_name: $.text('Office name'),
	address: $.textarea('Address'),
	phone: $.text('Phone'),
	email: $.text('Email'),
	image: $.text('Image'),
	image_alt: $.text('Image alt'),
})

defineBlock({
	name: 'OfficeCard',
	label: 'Office card',
	icon: 'place',
	category: 'content',
	description: 'Paris office details for the contact page.',
	schema,
	defaults: {},
})

const props = withDefaults(defineProps<Props>(), {})
</script>

<template>
	<section class="px-2 m_px-1 py-4">
		<div class="w-1100px mx-auto grid-2-col m_grid-wrap-1 gap-2">
			<div>
				<h2 class="txt-36 line-height-11 m-0">{{ props.heading }}</h2>
				<p v-if="props.office_name" class="sans m-0 mt-1">{{ props.office_name }}</p>
				<p v-if="props.address" class="sans line-height-15 m-0 mt-075 pre-line">{{ props.address }}</p>
				<p v-if="props.phone" class="sans m-0 mt-075">
					<a :href="'tel:' + props.phone.replace(/\s/g, '')">{{ props.phone }}</a>
				</p>
				<p v-if="props.email" class="sans m-0 mt-025">
					<a :href="'mailto:' + props.email">{{ props.email }}</a>
				</p>
			</div>
			<img v-if="props.image" :src="props.image" :alt="props.image_alt || props.office_name || props.heading" class="photo" />
		</div>
	</section>
</template>
