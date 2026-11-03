<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { defineBlock } from '@bagelink/blox'
import { Btn, Checkbox, SelectBtn, TextInput, defineSchema, $ } from '@bagelink/vue'

interface Field {
	name: string
	title: string
	kind: 'text' | 'textarea' | 'email' | 'phone' | 'checkbox' | 'choice'
	required: boolean
	options: { label: string; value: string }[]
}

interface Props {
	form?: string
	heading?: string
	intro?: string
	submit_label?: string
	success?: string
	fields?: Field[]
}

const fieldSchema = defineSchema({
	name: $.text('Champ'),
	title: $.text('Libellé'),
	kind: $.text('Type'),
	required: $.text('Requis'),
	options: $.array('Options', defineSchema({
		label: $.text('Libellé'),
		value: $.text('Valeur'),
	})),
})

const schema = defineSchema<Props>({
	form: $.text('Form definition'),
	heading: $.text('Heading'),
	intro: $.textarea('Intro'),
	submit_label: $.text('Submit label'),
	success: $.text('Success message'),
	fields: $.array('Champs', fieldSchema, { collapsible: true }),
})

defineBlock({
	name: 'FormBlock',
	label: 'Form',
	icon: 'assignment',
	category: 'form',
	description: 'Renders a public form definition with Bagelink inputs and submits it.',
	schema,
	defaults: {},
})

const props = withDefaults(defineProps<Props>(), {
	submit_label: 'Envoyer',
	success: 'Votre demande a bien été envoyée.',
})

const values = reactive<Record<string, string | boolean>>({})
const done = ref(false)
const error = ref('')
const sending = ref(false)
const fields = computed(() => props.fields ?? [])

async function submit() {
	if (!props.form || sending.value) return
	sending.value = true
	error.value = ''
	try {
		const response = await fetch(`/api/form/submit/${props.form}`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ ...values, _meta: { locale: 'fr' } }),
		})
		if (!response.ok) throw new Error('submit failed')
		done.value = true
	} catch {
		error.value = "L'envoi a échoué. Réessayez."
	} finally {
		sending.value = false
	}
}
</script>

<template>
	<section class="px-2 m_px-1 py-4">
		<div class="w-1100px mx-auto measure">
			<h2 v-if="props.heading" class="txt-36 line-height-11 m-0">{{ props.heading }}</h2>
			<p v-if="props.intro" class="sans line-height-15 m-0 mt-1">{{ props.intro }}</p>
			<p v-if="done" class="sans line-height-15 mt-2">{{ props.success }}</p>
			<form v-else class="grid gap-1 mt-2" @submit.prevent="submit">
				<template v-for="field in fields" :key="field.name">
					<label v-if="field.kind === 'checkbox'" class="sans flex gap-075 align-items-center">
						<Checkbox v-model="values[field.name]" />
						<span>{{ field.title }}</span>
					</label>
					<SelectBtn v-else-if="field.kind === 'choice'" v-model="values[field.name]" :label="field.title" :options="field.options" />
					<TextInput v-else v-model="values[field.name]" underlined :label="field.title" :type="field.kind === 'textarea' ? 'textarea' : field.kind" :required="field.required" />
				</template>
				<p v-if="error" class="sans m-0">{{ error }}</p>
				<Btn type="submit" :value="props.submit_label" :disabled="sending" />
			</form>
		</div>
	</section>
</template>
