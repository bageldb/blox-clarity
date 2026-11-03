<script setup lang="ts">
import { ref } from 'vue'
import { defineBlock } from '@bagelink/blox'
import { defineSchema, $ } from '@bagelink/vue'

interface Props {
	kicker?: string
	heading?: string
	intro?: string
	submit_label?: string
}

const schema = defineSchema<Props>({
	kicker: $.text('Kicker'),
	heading: $.text('Heading'),
	intro: $.textarea('Intro'),
	submit_label: $.text('Submit label'),
})

defineBlock({
	name: 'EvaluationForm',
	label: 'Free evaluation form',
	icon: 'assignment',
	category: 'form',
	description: 'Public free-evaluation form: jewellery type, contact fields and consent.',
	schema,
	defaults: {},
})

const props = withDefaults(defineProps<Props>(), {
	submit_label: 'Envoyer',
})

const jewelryTypes = [
	{ value: 'Diamond', label: 'Diamant' },
	{ value: 'Gemstone', label: 'Pierre de couleur' },
	{ value: 'Watch', label: 'Montre' },
	{ value: 'Bracelet', label: 'Bracelet' },
	{ value: 'Ring', label: 'Bague' },
	{ value: 'Necklace', label: 'Collier' },
	{ value: 'Earring', label: "Boucles d'oreilles" },
	{ value: 'Brooch', label: 'Broche' },
]

const jewelry_type = ref('')
const first_name = ref('')
const last_name = ref('')
const email = ref('')
const phone = ref('')
const message = ref('')
const consent = ref(false)
const done = ref(false)
const error = ref('')
const sending = ref(false)

async function submit() {
	error.value = ''
	if (!consent.value) {
		error.value = 'Le consentement est requis.'
		return
	}
	sending.value = true
	const response = await fetch('/api/form/submit/clarity100-evaluation', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			jewelry_type: jewelry_type.value,
			first_name: first_name.value,
			last_name: last_name.value,
			email: email.value,
			phone: phone.value,
			message: message.value,
			consent: true,
			form_complete: true,
			_meta: { locale: 'fr' },
		}),
	})
	sending.value = false
	if (response.ok) done.value = true
	else error.value = "L'envoi a échoué. Réessayez."
}
</script>

<template>
	<section class="px-2 m_px-1 py-4">
		<div class="w-1100px mx-auto">
			<p v-if="props.kicker" class="sans txt14 tracking-wide m-0 mb-1">{{ props.kicker }}</p>
			<h2 class="txt-36 line-height-11 m-0">{{ props.heading }}</h2>
			<p v-if="props.intro" class="sans line-height-15 measure m-0 mt-1">{{ props.intro }}</p>

			<p v-if="done" class="sans line-height-15 measure mt-2">Votre demande a bien été envoyée. Un gemmologue vous répond sous 24 heures.</p>

			<form v-else class="mt-2" @submit.prevent="submit">
				<fieldset class="bare m-0 p-0">
					<legend class="sans mb-1">Quel type de bijou souhaitez-vous vendre ?</legend>
					<label v-for="opt in jewelryTypes" :key="opt.value" class="sans flex gap-075 align-items-center mb-05">
						<input v-model="jewelry_type" type="radio" name="jewelry_type" :value="opt.value" required />
						{{ opt.label }}
					</label>
				</fieldset>

				<div class="grid-2-col m_grid-wrap-1 gap-1 mt-2">
					<label class="sans">Prénom
						<input v-model="first_name" type="text" required class="w-full" />
					</label>
					<label class="sans">Nom
						<input v-model="last_name" type="text" required class="w-full" />
					</label>
					<label class="sans">Email
						<input v-model="email" type="email" required class="w-full" />
					</label>
					<label class="sans">Téléphone
						<input v-model="phone" type="tel" required class="w-full" />
					</label>
				</div>

				<label class="sans block mt-1">Décrivez votre bijou
					<textarea v-model="message" rows="4" class="w-full" placeholder="Poids, forme, certificat, métal…"></textarea>
				</label>

				<label class="sans flex gap-075 align-items-start mt-1">
					<input v-model="consent" type="checkbox" required />
					<span>J'accepte la politique de confidentialité et les conditions générales</span>
				</label>

				<p v-if="error" class="sans mt-1">{{ error }}</p>
				<button class="btn mt-2" type="submit" :disabled="sending">{{ props.submit_label }}</button>
			</form>
		</div>
	</section>
</template>
