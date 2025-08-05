<script setup lang="ts">
import { useLightboxStore } from '@/stores/lightbox';
import { LIGHTBOX_ID } from '@/utils/constants';
import { useTemplateRef, watch } from 'vue';

const store = useLightboxStore();
const closeButtonRef = useTemplateRef('close-button');

watch(() => store.hasImage, (isOpen) => {
	const bodyClass = 'body--modal-open';
	if (isOpen) {
		document.body.classList.add(bodyClass);
		closeButtonRef.value?.focus();
	} else {
		document.body.classList.remove(bodyClass);
	}
})
</script>

<template>
	<div :class="{
		'modal': true,
		'modal--open': store.hasImage,
	}">
		<div
			class="modal__overlay"
			@click="store.clearImage"
		></div>
		<div
			:id="LIGHTBOX_ID"
			class="modal__content-wrapper"
			role="dialog"
			aria-live="assertive"
			:aria-modal="store.hasImage"
		>
			<button
				ref="close-button"
				class="btn modal__close-btn"
				@click="store.clearImage"
				aria-label="Close lightbox view"
				:aria-controls="LIGHTBOX_ID"
			>
				⨯
			</button>

			<div
				v-if="store.image"
				class="modal__content modal__content--lightbox"
			>
				<img
					:src="store.image.image || ''"
					:alt="store.image.imageAlt || ''"
				/>

				<p class="lightbox__actions">
					<a
						:href="store.image.image"
						class="btn"
						target="_blank"
					>
						View raw
					</a>
				</p>

				<p
					v-if="store.image.description"
					class="lightbox__description"
				>
					{{ store.image.description }}
				</p>

				<p
					v-if="store.image.imageAttribution"
					class="lightbox__attribution"
				>
					(attribution: {{ store.image.imageAttribution }})
				</p>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
@use '@/assets/core.scss';

$modal-top: 128px;
$base-z-index: 900;
$close-btn-size: 48px;
$close-btn-offset: 8px;

.modal {
	pointer-events: none;
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	max-width: 100%;
	height: 100vh;
	max-height: 100vh;
	overflow: hidden;
	z-index: $base-z-index;
	opacity: 0;
	transition: opacity 0.25s;
	
	&--open {
		pointer-events: all;
		overflow: auto;
		opacity: 1;
	}

	&__overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100vh;
		background-image: var(--stripes);
		z-index: ($base-z-index + 1);
	}

	&__content-wrapper {
		position: absolute;
		top: 100vh;
		left: 0;
		width: 100%;
		min-height: calc(100vh - $modal-top);
		background-color: var(--color-bg);
		color: var(--color-text);
		z-index: ($base-z-index + 2);
		box-shadow: 0 0 9px color-mix(in srgb, var(--color-bg), var(--color-text));
		transition: top 0.5s;
	}

	&--open &__content-wrapper {
		top: $modal-top;
	}

	&__close-btn {
		position: absolute;
		top: $close-btn-offset;
		right: $close-btn-offset;
		width: $close-btn-size;
		height: $close-btn-size;
		font-size: 1.5rem;
	}

	&__content {
		width: 100%;
		max-width: var(--page-width);
		margin: ($close-btn-size + $close-btn-offset) auto 0 auto;
		padding: 8px;

		@media screen and (min-width: (core.$page-width + $close-btn-size * 2)) {
			margin: 0 auto;
		}

		img {
			display: block;
			margin: 0 auto;
			max-width: 100%;
			max-height: calc(100vh - $modal-top - $close-btn-size * 3);
			object-fit: contain;
		}
	}
}

.lightbox {
	&__actions {
		text-align: center;
	}

	&__attribution {
		text-align: right;
		color: var(--color-text-light);
		font-size: 0.9rem;
	}
}
</style>