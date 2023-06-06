<template>
    <form @submit.prevent="saveNote">
        <InputNote v-model="note.title" />
        <label for="todo">Задачи:</label>
        <TodoList :todos="note.todos" />
        <button type="button" @click="addTodo">Добавить задачу</button>
        <button type="submit">Сохранить заметку</button>
    </form>
</template>

<script>

import TodoItem from "@/components/FormNote/TodoItem.vue";
import InputNote from "@/components/FormNote/InputNote.vue";
import TodoList from "@/components/FormNote/TodoList.vue";

export default {
    components: {
        TodoList,
        TodoItem,
        InputNote,
    },
    props: {
        allNotes: {
            type: Array,
            required: true,
        },
    },
    data() {
        return {
            note: {
                id: this.allNotes.length + 1,
                title: "",
                todos: [],
            },
        };
    },
    methods: {
        addTodo() {
            this.note.todos.push({id: this.generateUUID(), text: "", completed: false});
        },
        saveNote() {
            this.$store.dispatch("addNote", this.note);
            this.note = {
                id: this.allNotes.length + 1,
                title: "",
                todos: [],
            };
        },
        generateUUID() {
            return `uuid-${Date.now()}`;
        },
    },
};
</script>

<style scoped>
form {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: center;
}
</style>
