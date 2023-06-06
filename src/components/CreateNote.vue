<template>
    <div class="createNote">
        <h2>Создание заметки</h2>
        <form @submit.prevent="saveNote">
            <InputNote v-model="note.title" />
            <label for="todo">Задачи:</label>
            <ul>
                <TodoItem v-for="(todo, index) in note.todos" :key="todo.id" :todo="todo" @remove="removeTodo(index)" />
            </ul>
            <button type="button" @click="addTodo">Добавить задачу</button>
            <button type="submit">Сохранить заметку</button>
        </form>
    </div>
</template>

<script>
import {mapGetters} from "vuex";
import InputNote from "@/components/FormNote/InputNote.vue";
import TodoItem from "@/components/FormNote/TodoItem.vue";

export default {
    components: {TodoItem, InputNote},
    data() {
        return {
            note: {
                id: this.allNotes().length + 1,
                title: '',
                todos: [],
            },

        };
    },
    methods: {
        ...mapGetters(["allNotes"]),
        addTodo() {
            this.note.todos.push({id: this.generateUUID(), text: '', completed: false});
        },
        removeTodo(index) {
            this.note.todos.splice(index, 1);
        },
        saveNote() {
            console.log(this.allNotes().length)
            this.$store.dispatch('addNote', this.note);
            this.note = {
                id: this.allNotes().length + 1,
                title: '',
                todos: [],
            };
        },
        generateUUID() {
            return `uuid-${Date.now()}`;
        },
    },
};
</script>

<style>
.createNote {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

ul {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

form {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: center;
}
</style>