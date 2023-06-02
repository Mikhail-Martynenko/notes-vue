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
            <button type="button" @click="redoEdit" :disabled="redoStack.length === 0">Повторить изменение</button>

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
import {mapActions, mapMutations, mapState} from "vuex";
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
        // this.note = JSON.parse(JSON.stringify(this.noteProp));
        const noteId = this.$route.params.id;
        this.originalNote = deepClone(this.notes[noteId - 1]);
        this.note = this.notes[noteId - 1]
    },
    computed: {
        ...mapState(['notes']),// TODO mapGetters
        // Доступ к состоянию хранилища
    },
    methods: {
        ...mapActions(['updateNote', 'deleteNote']),// TODO mapActions

        // TODO FIX ID

        addTodo() {
            this.note.todos.push({id: this.generateUUID(), text: '', completed: false});

            // this.pushToUndoStack(); // Добавление изменения в стек отмены
        },
        removeTodo(index) {
            this.note.todos.splice(index, 1);
            // this.pushToUndoStack(); // Добавление изменения в стек отмены
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
            this.$store.commit('deleteNote', noteId);
            this.$router.push('/');
        },
        generateUUID() {
            return `uuid-${Date.now()}`;
        },
        // undoEdit() {
        //     if (this.undoStack.length > 0) {
        //         const previousState = this.undoStack.pop();
        //         this.redoStack.push(JSON.parse(JSON.stringify(this.note))); // Добавление текущего состояния в стек повтора
        //         this.note = previousState;
        //     }
        // },
        //
        // redoEdit() {
        //     const nextState = this.redoStack.pop();
        //     if (nextState) {
        //         this.undoStack.push(JSON.parse(JSON.stringify(this.note))); // Добавление текущего состояния в стек отмены
        //         this.note = nextState;
        //     }
        // },
        //
        // pushToUndoStack() {
        //     this.undoStack.push(JSON.parse(JSON.stringify(this.note))); // Добавление текущего состояния в стек отмены
        //     this.redoStack = []; // Очистка стека повтора при внесении нового изменения
        // },
    },
};
</script>
