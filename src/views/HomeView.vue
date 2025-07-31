<script setup lang="ts">
import { extractHost } from '@/utils/networkUtils';
import { useTemplateRef } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const hostInputRef = useTemplateRef('host-input');
function attemptLookup() {
	const host = extractHost(hostInputRef.value?.value || '');
	if (host)
		router.push({ name: 'lookup', params: { host } });
	else
		window.alert("Invalid host!");
}
</script>

<template>
	<p>Hello friends!! :)</p>

	<input
		type="text"
		ref="host-input"
	/>
	<button @click="attemptLookup">
		Go!
	</button>

	<h2>How does this work?</h2>

	<p>Lorenz crunchipsum jest imprezum, information about fursona schema goes here.</p>

	<p>
		Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.
	</p>
	
	<p>
		Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.
	</p>
</template>

<style lang="scss" scoped>

</style>