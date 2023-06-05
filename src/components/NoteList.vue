<template>
    <div class="list">
        <CreateNote @note-saved="addNote" />
        <h1>Список заметок</h1>
        <ul>
            <li v-for="note in this.allNotes()" :key="note.id">
                <router-link :to="'/edit/' + note.id">{{ note.title }}</router-link>
                <ul>
                    <li v-for="todo in note.todos" :key="todo.id">
                        <input type="checkbox" disabled />
                        <label>{{ todo.text }}</label>
                    </li>
                </ul>
                <br>
                <button @click="showModal=true">Удалить</button>
                <ModalView v-if="showModal">
                    <h3>Вы уверены, что хотите удалить заметку?</h3>
                    <button type="button" @click="deleteNote(note.id)">Удалить</button>
                    <button type="button" @click="showModal = false">Отмена</button>
                </ModalView>
            </li>
        </ul>
    </div>
</template>

<script>
import CreateNote from "@/components/CreateNote.vue";
import EditNote from "@/components/EditNote.vue";
import {mapGetters, mapState} from "vuex";
import ModalView from "@/components/ModalView.vue";


export default {
    components: {
        ModalView,
        EditNote,
        CreateNote,
    },
    data() {
        return {
            showModal: false
        }
    },
    methods: {
        ...mapGetters(['allNotes']),
        addNote(note) {
            this.$store.dispatch('addNote', note);
        },
        deleteNote(noteId) {
            this.$store.dispatch('deleteNote', noteId);
        },
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