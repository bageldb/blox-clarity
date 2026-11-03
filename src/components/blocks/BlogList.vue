<script setup lang="ts">
import { defineBlock } from '@bagelink/blox'
import { defineSchema, $ } from '@bagelink/vue'

interface Props {
	heading?: string
	intro?: string
	items?: Array<{ title?: string; excerpt?: string; image?: string; slug?: string }>
}

const schema = defineSchema<Props>({
	heading: $.text('Heading'),
	intro: $.textarea('Intro'),
	items: $.array('Articles', defineSchema({
		title: $.text('Title'),
		excerpt: $.textarea('Excerpt'),
		image: $.text('Image'),
		slug: $.text('Slug'),
	}), { collapsible: true, allowReorder: true }),
})

defineBlock({
	name: 'BlogList',
	label: 'Blog list',
	icon: 'article',
	category: 'content',
	description: 'Article cards bound to the articles datastore collection.',
	schema,
	defaults: { items: [] },
})

const props = withDefaults(defineProps<Props>(), { items: () => [] })
</script>

<template>
	<section class="px-2 m_px-1 py-4">
		<div class="w-1100px mx-auto">
			<h2 class="txt-36 line-height-11 m-0">{{ props.heading }}</h2>
			<p v-if="props.intro" class="sans line-height-15 measure m-0 mt-1">{{ props.intro }}</p>
			<ul class="bare grid grid-2-col m_grid-wrap-1 gap-2 mt-2">
				<li v-for="(item, i) in props.items" :key="item.slug || item.title || i" class="border-top pt-1">
					<div v-if="item.image" class="frame">
						<img :src="item.image" :alt="item.title || ''" />
					</div>
					<h3 class="txt-22 m-0 mt-1">
						<a v-if="item.slug" :href="'/blog/' + item.slug">{{ item.title }}</a>
						<template v-else>{{ item.title }}</template>
					</h3>
					<p v-if="item.excerpt" class="sans line-height-15 m-0 mt-075">{{ item.excerpt }}</p>
				</li>
			</ul>
		</div>
	</section>
</template>
