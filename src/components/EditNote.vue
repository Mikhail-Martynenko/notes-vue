<template>
    <div>
        <h2>Редактирование заметки</h2>
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
            <button type="button" @click="showCancelModal = true">Отменить редактирование</button>

            <button type="button" @click="undoEdit" :disabled="undoStack.length === 0">Назад</button>
            <button type="button" @click="redoEdit" :disabled="redoStack.length === 0">Вперед</button>

            <button type="button" @click="showDeleteModal=true">Удалить заметку</button>

            <ModalView v-if="showCancelModal">
                <h3>Вы уверены, отменить редактирование</h3>
                <button type="button" @click="cancelEdit()">Да</button>
                <button type="button" @click="showCancelModal = false">Нет</button>
            </ModalView>

            <ModalView v-if="showDeleteModal">
                <h3>Вы уверены, что хотите удалить заметку?</h3>
                <button type="button" @click="handleDeleteNote(note.id)">Удалить</button>
                <button type="button" @click="showDeleteModal = false">Отмена</button>
            </ModalView>
        </form>
    </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import ModalView from "@/components/ModalView.vue";
import {deepClone} from "@/utils/deepClone";
import TodoItem from "@/components/TodoItem.vue";

export default {
    components: {
        TodoItem,
        ModalView,
    },
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
            showDeleteModal: false,
            showCancelModal: false,
        };
    },
    mounted() {
        const noteId = this.$route.params.id;
        this.originalNote = deepClone(this.allNotes()[noteId - 1]);
        this.note = this.allNotes()[noteId - 1]
    },
    methods: {
        ...mapGetters(['allNotes']),
        ...mapActions(['updateNote', 'deleteNote']),

        addTodo() {
            const todo = {id: this.generateUUID(), text: "", completed: false};
            this.note.todos.push(todo);
            this.pushToUndoStack(() => {
                this.note.todos.pop();
            });
        },
        removeTodo(index) {
            const removedTodo = this.note.todos[index];
            this.note.todos.splice(index, 1);
            this.pushToUndoStack(() => {
                this.note.todos.splice(index, 0, removedTodo);
            }, () => {
                this.note.todos.splice(index, 1);
            });
        },
        saveNote() {
            this.updateNote(this.note)
            this.$router.push('/');
        },
        cancelEdit() {
            this.updateNote(this.originalNote)
            this.$router.push('/');
        },
        handleDeleteNote(noteId) {
            this.$store.dispatch('deleteNote', noteId);
            this.$router.push('/');
        },
        generateUUID() {
            return `uuid-${Date.now()}`;
        },
        undoEdit() {
            const undoAction = this.undoStack.pop();
            if (!undoAction) return;
            const clonedNote = deepClone(this.note);
            undoAction();
            this.redoStack.push(() => this.note = deepClone(clonedNote));
        },
        redoEdit() {
            const redoAction = this.redoStack.pop();
            if (!redoAction) return;
            const clonedNote = deepClone(this.note);
            redoAction();
            this.undoStack.push(() => this.note = deepClone(clonedNote));
        },
        pushToUndoStack(action) {
            this.undoStack.push(action);
            this.redoStack = [];
        },
    },
};
</script>

<style>
button {
    margin: 5px;
    background-color: hsla(160, 100%, 37%, 1);
    color: black;
    border-radius: 10px;
    padding: 5px;
}

button[disabled] {
    background-color: gray;
}
</style>