<script setup lang="ts">
import { defineBlock } from '@bagelink/blox'
import { defineSchema, $ } from '@bagelink/vue'

interface Props {
	heading?: string
	paragraphs?: Array<{ text?: string }>
	image?: string
	image_alt?: string
	caption?: string
}

const schema = defineSchema<Props>({
	heading: $.text('Heading'),
	paragraphs: $.array('Paragraphs', defineSchema({ text: $.textarea('Text') }), { collapsible: true, allowReorder: true }),
	image: $.text('Image URL'),
	image_alt: $.text('Image alt'),
	caption: $.text('Caption'),
})

defineBlock({
	name: 'AboutStory',
	label: 'About story',
	icon: 'history_edu',
	category: 'content',
	description: 'About-page story with office photo and founding copy.',
	schema,
	defaults: { paragraphs: [] },
})

const props = withDefaults(defineProps<Props>(), { paragraphs: () => [] })
</script>

<template>
	<section class="px-2 m_px-1 py-4">
		<div class="w-1100px mx-auto grid-2 m_grid-1 gap-2">
			<div>
				<h2 class="txt-36 line-height-11 m-0">{{ props.heading }}</h2>
				<p v-for="(p, i) in props.paragraphs" :key="i" class="sans line-height-15 measure m-0 mt-1">{{ p.text }}</p>
			</div>
			<figure v-if="props.image" class="m-0">
				<img :src="props.image" :alt="props.image_alt || props.heading" class="w-100" />
				<figcaption v-if="props.caption" class="sans txt-14 mt-075">{{ props.caption }}</figcaption>
			</figure>
		</div>
	</section>
</template>
