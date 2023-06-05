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
            <button type="button" @click="showCancelModal = true">Отменить редактирование</button>

            <button type="button" @click="undoEdit" :disabled="undoStack.length === 0">Отменить изменение</button>
            <button type="button" @click="redoEdit" :disabled="redoStack.length === 0">Повторить отмененное изменение</button>

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

export default {
    components: {
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
            const todo = { id: this.generateUUID(), text: "", completed: false };
            this.note.todos.push(todo);
            // this.pushToUndoStack(() => {
            //     this.note.todos.splice(this.note.todos.indexOf(todo), 1);
            // });
        },
        removeTodo(index) {
            const removedTodo = this.note.todos[index];
            this.note.todos.splice(index, 1);
            // this.pushToUndoStack(() => {
            //     this.note.todos.splice(index, 0, removedTodo);
            // });
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
        handleDeleteNote(noteId) {
            this.$store.dispatch('deleteNote', noteId);
            this.$router.push('/');
        },
        generateUUID() {
            return `uuid-${Date.now()}`;
        },
    //     undoEdit() {
    //         const undoAction = this.undoStack.pop();
    //         if (undoAction) {
    //             undoAction();
    //             this.redoStack.push(undoAction);
    //         }
    //     },
    //     redoEdit() {
    //         const redoAction = this.redoStack.pop();
    //         if (redoAction) {
    //             redoAction();
    //             this.undoStack.push(redoAction);
    //         }
    //     },
    //     pushToUndoStack(action) {
    //         this.undoStack.push(action);
    //         this.redoStack = [];
    //     },
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