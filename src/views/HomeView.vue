<script setup lang="ts">
import { extractHost } from '@/utils/networkUtils';
import { useTemplateRef } from 'vue';
import { useRouter } from 'vue-router';

const appInstanceName = import.meta.env.VITE_APP_NAME;
const router = useRouter();

const hostInputRef = useTemplateRef('host-input');
function onFormSubmit(e: Event): void {
	e.preventDefault();

	const host = extractHost(hostInputRef.value?.value || '');
	if (host)
		router.push({ name: 'lookup', params: { host } });
	else
		window.alert("Invalid host!");
}
</script>

<template>
	<main class="search-section">
		<p>Enter a domain name to look up its associated fursona information.</p>

		<form @submit="onFormSubmit">
			<input
				type="text"
				ref="host-input"
			/>

			<button class="btn">
				→
			</button>
		</form>
	</main>

	<aside aria-labelledby="how-does-this-work">
		<h2 id="how-does-this-work">How does this work?</h2>

		<p>
			Lorenz crunchipsum jest imprezum, add some information about how {{ appInstanceName }} works here, haha.
		</p>

		<p>
			Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.
		</p>
		
		<p>
			Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.
		</p>
	</aside>
</template>

<style lang="scss" scoped>
.search-section {
	width: 100%;
	max-width: calc(var(--page-width) * 0.66);
	margin: 4rem auto 5rem auto;

	& > form {
		display: flex;
		gap: 0.5rem;

		input[type="text"] {
			flex: 1 1 auto;
			font-size: 1.5rem;
			padding: 0 0.5rem;
			height: 48px;
			min-width: 100px;
		}

		button {
			width: 48px;
			min-width: 48px;
			height: 48px;
			font-size: 1.5rem;
			font-weight: bold;
		}
	}
}
</style>