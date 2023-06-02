<template>
    <div class="list">
        <CreateNote @note-saved="addNote" />
        <h1>Список заметок</h1>
        <ul>
            <li v-for="note in notes" :key="note.id">
                <router-link :to="'/edit/' + note.id">{{note.title}}</router-link>
                <ul>
                    <li v-for="todo in note.todos" :key="todo.id">
                        <input type="checkbox" disabled />
                        <label>{{ todo.text }}</label>
                    </li>
                </ul>
                <br>
<!--                <div>-->
<!--                    <EditNote :noteProp="note" @cancel-edit="showEditNote" />-->
<!--                </div>-->
                <button @click="showEditNote">Изменить</button>
                <button @click="deleteNote(note.id)">Удалить</button>
            </li>
        </ul>
    </div>
</template>

<script>

import CreateNote from "@/components/CreateNote.vue";
import EditNote from "@/components/EditNote.vue";
import {mapState} from "vuex";


export default {
    components: {
        EditNote,
        CreateNote,
    },
    computed: {
        ...mapState(['notes']),
    },
    methods: {
        addNote(note) {
            this.$store.commit('addNote', note);
        },
        deleteNote(noteId) {
            if (confirm("Вы уверены, что хотите удалить заметку?")) {
                console.log("Заметка удалена:", noteId);
                this.$store.commit('deleteNote', noteId);
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