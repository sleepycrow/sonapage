<script setup lang="ts">
const props = defineProps<{
	hexCode: string;
}>();

const unprefixedHex = props.hexCode.replace('#', '');
const isDark = Number('0x' + unprefixedHex.substring(0, 1)) < 7; // TODO: Add check for transparency
</script>

<template>
	<li
		:style="{ backgroundColor: ('#' + unprefixedHex) }"
		:class="{
			'oc-card__colors__item': true,
			'oc-card__colors__item--light': !isDark,
			'oc-card__colors__item--dark': isDark,
		}"
	>
		#{{ unprefixedHex }}
	</li>
</template>

<style lang="scss" scoped>
.oc-card__colors__item {
	&--light {
		color: #000;
	}

	&--dark {
		color: #FFF;
	}
}
</style>