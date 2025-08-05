<script setup lang="ts">
import type { GalleryItem } from '@/interfaces/FursonaSchema';
import { useLightboxStore } from '@/stores/lightbox';
import { LIGHTBOX_ID } from '@/utils/constants';

const store = useLightboxStore();
const props = defineProps<{
	image: GalleryItem;
}>();

const openImage = () => store.setImage(props.image);

const onKeyDown = (e: KeyboardEvent) => {
	if (e.key === 'Enter'){
		openImage();
		e.preventDefault();
	}
}
</script>

<template>
	<div
		class="lightbox-thumbnail"
		role="button"
		tabindex="0"
		aria-label="Expand image into lightbox view"
		:aria-controls="LIGHTBOX_ID"
		@click="openImage"
		@keydown="onKeyDown"
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