<script setup lang="ts">
import { defineBlock } from '@bagelink/blox'
import { defineSchema, $ } from '@bagelink/vue'

interface Props {
	kicker?: string
	heading?: string
	subheading?: string
	primary_label?: string
	primary_href?: string
	secondary_label?: string
	secondary_href?: string
	image?: string
	image_alt?: string
	caption?: string
}

const schema = defineSchema<Props>({
	kicker: $.text('Kicker'),
	heading: $.text('H1'),
	subheading: $.textarea('Subheading'),
	primary_label: $.text('Primary CTA'),
	primary_href: $.text('Primary href'),
	secondary_label: $.text('Secondary CTA'),
	secondary_href: $.text('Secondary href'),
	image: $.text('Image URL'),
	image_alt: $.text('Image alt'),
	caption: $.text('Image caption'),
})

defineBlock({
	name: 'DiamondOffer',
	label: 'Diamond offer hero',
	icon: 'diamond',
	category: 'hero',
	description: 'Home hero with a single h1, diamond offer, CTAs and photo.',
	schema,
	defaults: {},
})

const props = withDefaults(defineProps<Props>(), {})
</script>

<template>
	<section class="px-2 m_px-1">
		<div class="w-1100px mx-auto grid grid-2-col m_grid-wrap-1 gap-3 stone">
			<div class="pb-4">
				<h1 class="txt-36 line-height-11 m-0">{{ props.heading }}</h1>
				<p v-if="props.subheading" class="sans line-height-15 measure m-0 mt-1">{{ props.subheading }}</p>
				<div class="flex gap-1 wrap mt-2">
					<a v-if="props.primary_label" class="bgl_btn" :href="props.primary_href || '/contact'">{{ props.primary_label }}</a>
					<a v-if="props.secondary_label" class="bgl_btn bgl_btn-ghost" :href="props.secondary_href || '/how-it-works'">{{ props.secondary_label }}</a>
				</div>
			</div>
			<figure v-if="props.image" class="m-0">
				<img :src="props.image" :alt="props.image_alt || ''" />
				<figcaption v-if="props.caption" class="txt14 quiet mt-075">{{ props.caption }}</figcaption>
			</figure>
		</div>
	</section>
</template>
