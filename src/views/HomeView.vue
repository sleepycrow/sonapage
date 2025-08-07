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
				placeholder="example.com"
				aria-label="domain name"
			/>

			<button
				class="btn"
				aria-label="submit"
			>
				➔
			</button>
		</form>
	</main>

	<aside aria-labelledby="explainer-heading">
		<h2 id="explainer-heading">How does this work?</h2>

		<p>
			Websites can use the <a href="https://github.com/pyrox0/fursona-schema">fursona schema</a>
			file format to publish information about their associated fursonas in a standardized,
			computer-readable way. Given the address of a website, <strong>{{ appInstanceName }}</strong>
			checks if the given site has such information, and &mdash; if yes &mdash; displays it!
		</p>
	</aside>

	<aside aria-labelledby="free-space-heading">
		<h2 id="free-space-heading">Free space!</h2>

		<p>
			Shout out to all the furs on <a href="https://web.libera.chat/##furry">##furry on
			libera.chat</a> and the <a href="https://www.furnet.org/wiki/index.php/Servers">FurNet</a>
			IRC network! ;3
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