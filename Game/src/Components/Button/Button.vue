<script setup>
import { computed } from 'vue';

const props = defineProps({
	text: {
		type: String,
		default: 'Button',
	},
	type: {
		type: String,
		default: 'button',
	},
	disabled: {
		type: Boolean,
		default: false,
	},
	leftIcon: {
		type: String,
		default: '/images/flower_icon_left.webp',
	},
	rightIcon: {
		type: String,
		default: '/images/flower_icon_right.webp',
	},
});

const emit = defineEmits(['click']);

const baseUrl = import.meta.env.BASE_URL;
const leftIconSrc = computed(() => `${baseUrl}${props.leftIcon.replace(/^\/+/, '')}`);
const rightIconSrc = computed(() => `${baseUrl}${props.rightIcon.replace(/^\/+/, '')}`);

function handleClick(event) {
	if (props.disabled) return;
	emit('click', event);
}
</script>

<template>
	<button
		class="ornate-button"
		:type="type"
		:disabled="disabled"
		@click="handleClick"
	>
		<span class="content-row">
			<img :src="leftIconSrc" alt="Left flower icon" class="flower-icon" />
			<span class="label-wrap">
				<span class="label">{{ text }}</span>
			</span>
			<img :src="rightIconSrc" alt="Right flower icon" class="flower-icon" />
		</span>
	</button>
</template>

<style scoped>
 @import url("./Button.css");
</style>
