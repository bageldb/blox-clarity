<script setup lang="ts">
import { defineBlock } from '@bagelink/blox'
import { defineSchema, $ } from '@bagelink/vue'

interface Props {
	heading?: string
	intro?: string
	steps?: Array<{ title?: string; text?: string }>
	note?: string
}

const schema = defineSchema<Props>({
	heading: $.text('Heading'),
	intro: $.textarea('Intro'),
	steps: $.array('Steps', defineSchema({ title: $.text('Title'), text: $.textarea('Text') }), { collapsible: true, allowReorder: true }),
	note: $.textarea('Note'),
})

defineBlock({
	name: 'ProcessDetail',
	label: 'Process detail',
	icon: 'list_alt',
	category: 'content',
	description: 'Long-form how-it-works steps with supporting copy.',
	schema,
	defaults: { steps: [] },
})

const props = withDefaults(defineProps<Props>(), { steps: () => [] })
</script>

<template>
	<section class="px-2 m_px-1 py-4">
		<div class="w-1100px mx-auto">
			<h2 class="txt-36 line-height-11 m-0">{{ props.heading }}</h2>
			<p v-if="props.intro" class="sans line-height-15 measure m-0 mt-1">{{ props.intro }}</p>
			<ol class="bare mt-2">
				<li v-for="(step, i) in props.steps" :key="step.title || i" class="border-top py-1">
					<h3 class="txt-22 m-0">{{ step.title }}</h3>
					<p class="sans line-height-15 measure m-0 mt-075">{{ step.text }}</p>
				</li>
			</ol>
			<p v-if="props.note" class="sans line-height-15 measure m-0 mt-2">{{ props.note }}</p>
		</div>
	</section>
</template>
