<script setup lang="ts">
import { defineBlock } from '@bagelink/blox'
import { defineSchema, $ } from '@bagelink/vue'

interface Props {
	heading?: string
	intro?: string
	members?: Array<{ name?: string; role?: string; bio?: string; image?: string }>
}

const schema = defineSchema<Props>({
	heading: $.text('Heading'),
	intro: $.textarea('Intro'),
	members: $.array('Members', defineSchema({
		name: $.text('Name'),
		role: $.text('Role'),
		bio: $.textarea('Bio'),
		image: $.text('Image'),
	}), { collapsible: true, allowReorder: true }),
})

defineBlock({
	name: 'TeamGrid',
	label: 'Team grid',
	icon: 'groups',
	category: 'content',
	description: 'Team portraits for the about page.',
	schema,
	defaults: { members: [] },
})

const props = withDefaults(defineProps<Props>(), { members: () => [] })
</script>

<template>
	<section class="px-2 m_px-1 py-4">
		<div class="w-1100px mx-auto">
			<h2 class="txt-36 line-height-11 m-0">{{ props.heading }}</h2>
			<p v-if="props.intro" class="sans line-height-15 measure m-0 mt-1">{{ props.intro }}</p>
			<ul class="bare grid-4 t_grid-2 m_grid-1 gap-2 mt-2">
				<li v-for="(m, i) in props.members" :key="m.name || i">
					<img v-if="m.image" :src="m.image" :alt="m.name" class="w-100" />
					<h3 class="txt-22 m-0 mt-1">{{ m.name }}</h3>
					<p v-if="m.role" class="sans txt-14 m-0 mt-025">{{ m.role }}</p>
					<p v-if="m.bio" class="sans line-height-15 m-0 mt-075">{{ m.bio }}</p>
				</li>
			</ul>
		</div>
	</section>
</template>
