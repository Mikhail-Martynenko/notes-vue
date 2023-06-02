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


            <button type="button" @click="undoEdit" :disabled="undoStack.length === 0">Отменить изменение</button>
            <button type="button" @click="redoEdit" :disabled="redoStack.length === 0">Повторить изменение</button>
        </form>
    </div>
</template>

<script>
import {mapGetters, mapMutations, mapState} from "vuex";

export default {
    // props: ['noteProp'],
    data() {
        return {
            note: {
                id: '',
                title: '',
                todos: [],
            },
            originalNote: {},
            undoStack: [], // Стек для отмены изменений
            redoStack: [], // Стек для повтора изменений
        };
    },
    mounted() {
        // this.note = JSON.parse(JSON.stringify(this.noteProp));
        const noteId = this.$route.params.id;
        this.originalNote = JSON.parse(JSON.stringify(this.notes[noteId - 1]));
        this.note = this.notes[noteId - 1]
    },
    computed: {
        ...mapState(['notes']), // Доступ к состоянию хранилища
    },
    methods: {
        ...mapMutations(['updateNote']),
        addTodo() {
            this.note.todos.push({id: this.generateUUID(), text: '', completed: false});

            // this.pushToUndoStack();
        },
        removeTodo(index) {
            this.note.todos.splice(index, 1);
            // this.pushToUndoStack();
        },
        saveNote() {
            console.log(this.note, 'this note');
            this.updateNote(this.note)
            this.$router.push('/');
        },
        cancelEdit() {
            this.updateNote(this.originalNote)
            this.$router.push('/');
        },
        generateUUID() {
            return `uuid-${Date.now()}`;
        },

        // undoEdit() {
        //     console.log(this.note, 'prev')
        //     const previousState = this.undoStack.pop();
        //     if (previousState) {
        //         this.redoStack.push(JSON.parse(JSON.stringify(this.note))); // Добавление текущего состояния в стек повтора
        //         this.note = previousState;
        //     }
        //     console.log(this.note, 'next')
        // },
        // redoEdit() {
        //     const nextState = this.redoStack.pop();
        //     if (nextState) {
        //         this.undoStack.push(JSON.parse(JSON.stringify(this.note))); // Добавление текущего состояния в стек отмены
        //         this.note = nextState;
        //     }
        // },
        // pushToUndoStack() {
        //     this.undoStack.push(JSON.parse(JSON.stringify(this.note))); // Добавление текущего состояния в стек отмены
        //     this.redoStack = []; // Очистка стека повтора при внесении нового изменения
        // },
    },
};
</script>
