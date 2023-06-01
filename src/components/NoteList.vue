<template>
    <div class="list">
        <CreateNote @note-saved="addNote" />
        <h1>Список заметок</h1>
        <ul>
            <li v-for="note in notes" :key="note.id">
                <h2>{{ note.title }}</h2>
                <ul>
                    <li v-for="todo in note.todos" :key="todo.id">
                        <input type="checkbox" disabled />
                        <label>{{ todo.text }}</label>
                    </li>
                </ul>
                <br>
                <!--                <router-link :to="'/edit/' + note.id">Изменить</router-link>-->
                <div v-show="showCreateNote">
                    <EditNote :noteProp="note" :show="showCreateNote" @cancel-edit="showEditNote" />
                </div>
                <button @click="showEditNote">Изменить</button>
                <button @click="deleteNote(note.id)">Удалить</button>
            </li>
        </ul>
    </div>
</template>

<script>

import CreateNote from "@/components/CreateNote.vue";
import EditNote from "@/components/EditNote.vue";

export default {
    components: {
        EditNote,
        CreateNote,
    },
    data() {
        return {
            notes: [
                {
                    id: 1,
                    title: 'Заметка 1',
                    todos: [
                        {id: 1, text: 'Задача 1', completed: false},
                        {id: 2, text: 'Задача 2', completed: true},
                        {id: 3, text: 'Задача 3', completed: false},
                    ],
                },
            ],
            showCreateNote: false
        };
    },
    methods: {
        addNote(note) {
            this.notes.push(note);
        },
        deleteNote(noteId) {
            if (confirm("Вы уверены, что хотите удалить заметку?")) {
                console.log("Заметка удалена:", noteId);
                this.notes = this.notes.filter((note) => note.id !== noteId);
            }
        },
        showEditNote() {
            this.showCreateNote = !this.showCreateNote
        }
    },
};
</script>
<style>
.list {
    display: flex;
    flex-direction: column;
    gap: 40px;
}
</style>