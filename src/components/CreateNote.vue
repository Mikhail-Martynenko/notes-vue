<template>
    <div class="createNote">
        <h2>Создание заметки</h2>
        <form @submit.prevent="saveNote">
            <label for="title">Название:</label>
            <input type="text" id="title" v-model="note.title" required />
            <label for="todo">Задачи:</label>
            <ul>
                <li v-for="(todo, index) in note.todos" :key="todo.id">
                    <input type="checkbox" v-model="todo.completed" />
                    <input type="text" v-model="todo.text" required />
                    <button type="button" @click="removeTodo(index)">Удалить</button>
                </li>
            </ul>
            <button type="button" @click="addTodo">Добавить задачу</button>
            <button type="submit">Сохранить заметку</button>
        </form>
    </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
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