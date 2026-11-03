<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
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
}

const schema = defineSchema<Props>({
	form: $.text('Form definition'),
	heading: $.text('Heading'),
	intro: $.textarea('Intro'),
	submit_label: $.text('Submit label'),
	success: $.text('Success message'),
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

const fields = ref<Field[]>([])
const values = reactive<Record<string, string | boolean>>({})
const done = ref(false)
const error = ref('')
const sending = ref(false)

const missing = computed(() => props.form && fields.value.length === 0 && error.value)

function kindOf(property: Record<string, unknown>): Field['kind'] {
	const declared = String(property['x-field-type'] ?? '')
	if (declared === 'checkbox' || property.const === true) return 'checkbox'
	if (declared === 'textarea') return 'textarea'
	if (declared === 'email' || property.format === 'email') return 'email'
	if (declared === 'phone' || property.format === 'tel') return 'phone'
	if (Array.isArray(property.enum) || Array.isArray(property['x-options'])) return 'choice'
	return 'text'
}

function optionsOf(property: Record<string, unknown>): Field['options'] {
	const declared = property['x-options']
	if (Array.isArray(declared)) {
		return declared.map((option) => ({
			label: String(option.label ?? option),
			value: String(option.value ?? option),
		}))
	}
	if (Array.isArray(property.enum)) {
		return property.enum.map((option) => ({ label: String(option), value: String(option) }))
	}
	return []
}

async function load(name: string) {
	error.value = ''
	fields.value = []
	const response = await fetch(`/api/form/public/definitions/by-name/${name}`)
	if (!response.ok) {
		error.value = 'Formulaire introuvable.'
		return
	}
	const definition = await response.json()
	const properties = definition.schema_def?.properties ?? {}
	const required = new Set<string>(definition.schema_def?.required ?? [])
	const order: string[] = definition.schema_def?.['x-property-order'] ?? Object.keys(properties)
	fields.value = order.filter((name) => properties[name]).map((name) => {
		const property = properties[name] as Record<string, unknown>
		return {
			name,
			title: String(property.title ?? name),
			kind: kindOf(property),
			required: required.has(name),
			options: optionsOf(property),
		}
	})
	for (const field of fields.value) values[field.name] = field.kind === 'checkbox' ? false : ''
}

watch(() => props.form, (name) => { if (name) load(name) }, { immediate: true })

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
			<p v-else-if="missing" class="sans mt-2">{{ error }}</p>
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
