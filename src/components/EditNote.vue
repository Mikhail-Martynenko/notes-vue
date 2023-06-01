<template>
    <div>
        <h2>Редактирование заметки</h2>
        <form @submit.prevent="saveNote">
            <label for="title">Название:</label>
            <input type="text" id="title" v-model="note.title" required />
            <br>
            <label for="todo">Задачи:</label>
            <br>
            <ul>
                <li v-for="(todo, index) in note.todos" :key="todo.id">
                    <input type="checkbox" v-model="todo.completed" />
                    <input type="text" v-model="todo.text" required />
                    <button type="button" @click="removeTodo(index)">Удалить</button>
                </li>
            </ul>
            <button type="button" @click="addTodo">Добавить задачу</button>
            <button type="submit">Сохранить изменения</button>
            <button type="button" @click="cancelEdit">Отменить редактирование</button>
        </form>
    </div>
</template>

<script>
export default {
    props: ['noteProp', 'show'],
    data() {
        return {
            note: {
                id: '',
                title: '',
                todos: [],
            },
            originalNote: {},
        };
    },
    mounted() {
        this.note = JSON.parse(JSON.stringify(this.noteProp));
        this.originalNote = JSON.parse(JSON.stringify(this.noteProp));
    },
    methods: {
        addTodo() {
            this.note.todos.push({id: this.generateUUID(), text: '', completed: false});
        },
        removeTodo(index) {
            this.note.todos.splice(index, 1);
        },
        saveNote() {
            console.log(this.note, 'this note');
            // this.$emit('note-saved', this.note);
            // this.$router.push('/');
            // Object.assign(this.noteProp, this.note);
            this.$emit('cancel-edit');
        },
        cancelEdit() {
            // this.$router.push('/');
            this.note = JSON.parse(JSON.stringify(this.originalNote));
            this.$emit('cancel-edit');

        },
        generateUUID() {
            return `uuid-${Date.now()}`;
        },
    },
};
</script>
