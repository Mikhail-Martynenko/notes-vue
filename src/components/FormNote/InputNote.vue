<template>
    <div>
        <label for="title">Название:</label>
        <input type="text" id="title" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" required />
    </div>
</template>

<script setup>
defineProps({
    modelValue: {
        type: String,
    }
});
defineEmits(['update:modelValue']);
</script>
