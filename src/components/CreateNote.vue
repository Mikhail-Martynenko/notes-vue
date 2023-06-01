<template>
    <div>
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
export default {
    props: ['dataProp'],
    data() {
        return {
            note: {
                id: this.generateUUID(),
                title: '',
                todos: [],
            },

        };
    },
    methods: {
        addTodo() {
            this.note.todos.push({id: this.generateUUID(), text: '', completed: false});
        },
        removeTodo(index) {
            this.note.todos.splice(index, 1);
        },
        saveNote() {

            console.log(this.note);
            this.$emit('note-saved', this.note);
            // Очищаем форму
            this.note = {
                id: this.generateUUID(),
                title: '',
                todos: [],
            };

            // Можно добавить дополнительную логику после сохранения заметки, например, перенаправление пользователя на другую страницу
        },
        generateUUID() {
            // Генерация уникального идентификатора
            // В данном примере используется простая реализация, не являющаяся истинно уникальной во всех случаях.
            // Для реального приложения следует использовать более надежный механизм генерации UUID.
            return `uuid-${Date.now()}`;
        },
    },
};
</script>
