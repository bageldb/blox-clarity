<script setup lang="ts">
import { defineBlock } from '@bagelink/blox'
import { defineSchema, $ } from '@bagelink/vue'

interface Props {
	heading?: string
	text?: string
	cta_label?: string
	cta_href?: string
}

const schema = defineSchema<Props>({
	heading: $.text('Heading'),
	text: $.textarea('Text'),
	cta_label: $.text('CTA label'),
	cta_href: $.text('CTA href'),
})

defineBlock({
	name: 'CtaBand',
	label: 'CTA band',
	icon: 'campaign',
	category: 'content',
	description: 'Closing call-to-action band.',
	schema,
	defaults: {},
})

const props = withDefaults(defineProps<Props>(), {})
</script>

<template>
	<section class="px-2 m_px-1 py-4">
		<div class="w-1100px mx-auto border-top pt-2">
			<h2 class="txt-36 line-height-11 m-0">{{ props.heading }}</h2>
			<p v-if="props.text" class="sans line-height-15 measure m-0 mt-1">{{ props.text }}</p>
			<p v-if="props.cta_label" class="mt-2 m-0">
				<a class="btn" :href="props.cta_href || '/contact'">{{ props.cta_label }}</a>
			</p>
		</div>
	</section>
</template>
