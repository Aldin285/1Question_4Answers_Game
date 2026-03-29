<script setup>

defineProps({

    id: {
        type: Number,
        required: true
    },
    
    answer: {
        type: String,
        required: true
    },
    style: {
        type: Object,
        default: () => ({})
    },
    disabled: {
        type: Boolean,
        default: false
    }
});

</script>

<template>
<div>
    <button type="button" :id="id" :style="style" :disabled="disabled">{{ answer }}</button>
</div>
</template>

<style scoped>
@import url("./OptionBox.css");
</style>