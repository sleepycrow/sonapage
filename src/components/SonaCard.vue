<script setup lang="ts">
import type { Sona } from '@/interfaces/FursonaSchema';
import SonaCardColorChip from './SonaCardColorChip.vue';

const props = defineProps<{
	sona: Sona;
}>();

const sona = props.sona;

const metaItems: ({ key: string, value: any }[]) = [
	{ key: 'AGE', value: sona.age },
	{ key: 'GENDER', value: sona.gender },
	{ key: 'PRONOUNS', value: sona.pronouns },
	{ key: 'SPECIES', value: sona.species },
].filter(item => item.value !== null && item.value !== undefined);

const HEX_COLOR_REGEX = /^#?[a-f0-9]{3,8}$/i;
const colors = sona.colors?.filter(color => HEX_COLOR_REGEX.test(color));
</script>

<template>
	<article class="oc-card">
		<aside class="oc-card__avatar">
			<img
				:src="sona.avatar || ''"
				:alt="sona.avatarAlt || ''"
			/>
		</aside>
		<main class="oc-card__info">
			<h2>{{ sona.name }}</h2>

			<ul class="oc-card__meta">
				<li
					v-for="item in metaItems"
					:key="item.key"
					:aria-label="item.key"
				>
					{{ item.value }}
				</li>
			</ul>

			<p>{{ sona.description }}</p>

			<ul
				v-if="sona.gallery && sona.gallery.length > 0"
				class="oc-card__gallery"
				aria-label="gallery"
			>
				<li
					v-for="image in sona.gallery"
					:key="image.image"
				>
					<a href="#">
						<img
							:src="image.image"
							:alt="image.imageAlt"
						/>
					</a>
				</li>
			</ul>

			<ul
				v-if="colors && colors.length > 0"
				class="oc-card__colors"
				aria-label="colors"
			>
				<SonaCardColorChip
					v-for="color in colors"
					:key="color"
					:hex-code="color"
				/>
			</ul>
		</main>
	</article>
</template>

<style lang="scss" scoped>
.oc-card {
	width: 100%;
	margin: 2rem 0;
	
	@media screen and (min-width: 600px) {
		display: grid;
		grid-template-columns: 1fr 3fr;
		gap: 1rem;
	}
	
	&__avatar img {
		width: 200px;
		height: auto;
		margin-bottom: 0.5rem;
		
		@media screen and (min-width: 600px) {
			width: 100%;
		}
	}
  
	&__info {
		h2 {
			margin: 0;
			font-size: 2rem;
		}
	}
	
	&__meta {
		list-style-type: none;
		padding: 0;
		margin: 0;
		
		li {
			display: inline-block;
			color: #666;
			font-size: 0.9rem;
			margin-right: 0.25rem;
			
			&:not(:first-child)::before {
				content: '•';
				margin-right: 0.25rem;
			}
		}
	}
	
	&__gallery,
	&__colors {
		display: flex;
		flex-wrap: wrap;
		list-style-type: none;
		padding: 0;
		margin: 0;
		
		li {
			display: inline-block;
			margin: 0 0.25rem 0.25rem 0;
		}
	}
	
	&__gallery li {
		$img-size: 120px;
		width: $img-size;
		height: $img-size;
		overflow: hidden;

		img {
			display: block;
			width: $img-size;
			height: $img-size;
			object-fit: cover;
		}
	}
}
</style>