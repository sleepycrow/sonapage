<script setup lang="ts">
import type { GalleryItem } from '@/interfaces/FursonaSchema';
import { useLightboxStore } from '@/stores/lightbox';

const store = useLightboxStore();

const props = defineProps<{
	image: GalleryItem;
}>();
</script>

<template>
	<div
		class="lightbox-thumbnail"
		role="button"
		tabindex="0"
		aria-label="Expand image into lightbox view"
		@click="() => store.setImage(props.image)"
	>
		<img
			:src="props.image.image"
			:alt="props.image.imageAlt"
		/>
	</div>
</template>

<style lang="scss" scoped>
.lightbox-thumbnail {
	cursor: pointer;
}
</style>