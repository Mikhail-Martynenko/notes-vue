<template>
    <li>
        <input type="checkbox" v-model="todo.completed" />
        <input type="text" v-model="todo.text" required />
        <button type="button" @click="remove">Удалить</button>
    </li>
</template>

<script setup>
import {ref, defineProps, defineEmits} from 'vue';

const props = defineProps({
    todo: Object,
});

const todo = ref(props.todo);


const emit = defineEmits(['remove']);

const remove = () => {
    emit('remove');
};
</script>
