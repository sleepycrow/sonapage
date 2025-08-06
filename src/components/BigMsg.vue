<script setup lang="ts">
const props = defineProps<{
	icon?: string;
	header?: string;
	body?: string;
}>();
</script>

<template>
	<div class="big-msg">
		<div
			v-if="props.icon"
			class="big-msg__icon"
			aria-hidden="true"
		>
			{{ props.icon }}
		</div>

		<h2
			v-if="props.header"
			class="big-msg__header"
		>
			{{ props.header }}
		</h2>

		<div
			v-if="props.body"
			class="big-msg__body"
		>
			{{ props.body }}
		</div>
	</div>
</template>

<style lang="scss" scoped>
.big-msg {
	text-align: center;
	padding: 2rem 0;

	&__icon {
		font-size: 4rem;
	}

	&__header {
		font-size: 1.5rem;
		margin: 1rem 0 0.5rem 0;
	}
}
</style>