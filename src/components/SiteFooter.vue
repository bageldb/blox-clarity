<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
	<footer class="border-top mt-6">
		<div class="w-1100px mx-auto px-2 m_px-1 py-3 grid gap-2">
			<div class="flex space-between align-items-end gap-2 m_column m_align-items-start">
				<p class="txt-28 m-0" style="letter-spacing: -0.03em">Clarity</p>
				<p class="sans txt13 quiet m-0 measure">
					La vraie valeur de votre diamant. Une estimation gratuite, puis la meilleure offre.
				</p>
			</div>
			<nav class="flex gap-1-5 flex-wrap sans txt13 quiet" aria-label="Informations">
				<RouterLink to="/about" class="decoration-none">À propos</RouterLink>
				<RouterLink to="/why-sell-with-us" class="decoration-none">Pourquoi</RouterLink>
				<RouterLink to="/how-it-works" class="decoration-none">Comment</RouterLink>
				<RouterLink to="/contact" class="decoration-none">Contact</RouterLink>
			</nav>
		</div>
	</footer>
</template>
