<script setup lang="ts">
import SonaCard from '@/components/SonaCard.vue';
import BigMsg from '@/components/BigMsg.vue';
import type { FursonaSchema } from '@/interfaces/FursonaSchema';
import { extractHost, loadFursonaInfo } from '@/utils/networkUtils';
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const isLoading = ref(false);
const errorMessage = ref<string | null>(null);
const fursonaInfo = ref<FursonaSchema | null>(null);

const fursonas = computed(() => (fursonaInfo.value?.sonas || []));

watch(() => route.params.host, (newHost) => {
	isLoading.value = true;
	errorMessage.value = null;
	fursonaInfo.value = null;

	const rawHostString = typeof newHost === 'string' ? newHost : newHost[0];
	const host = extractHost(rawHostString);

	if (!host) {
		isLoading.value = false;
		errorMessage.value = "Invalid host!";
		return;
	}

	loadFursonaInfo(host)
		.then(receivedInfo => fursonaInfo.value = receivedInfo)
		.catch(err => errorMessage.value = err.toString())
		.finally(() => isLoading.value = false);
}, { immediate: true });
</script>

<template>
	<BigMsg
		v-if="isLoading"
		icon="⏳️"
		header="Loading..."
	/>
	<BigMsg
		v-else-if="errorMessage"
		icon="🛑"
		header="Error"
		:body="errorMessage"
	/>
	<template v-else-if="fursonaInfo">
		<SonaCard
			v-for="sona in fursonas"
			:key="sona.name"
			:sona="sona"
		/>

		<details>
			<summary>Raw data</summary>
			<pre v-html="JSON.stringify(fursonaInfo, null, 2)"></pre>
		</details>
	</template>
</template>

<style lang="scss" scoped>
pre {
	max-width: 100%;
	overflow-x: auto;
}
</style>