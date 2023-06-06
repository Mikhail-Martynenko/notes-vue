<template>
    <li :key="note.id">
        <router-link :to="'/edit/' + note.id">{{ note.title }}</router-link>
        <ul>
            <li v-for="todo in note.todos" :key="todo.id">
                <input type="checkbox" :checked="todo.completed" disabled/>
                <label>{{ todo.text }}</label>
            </li>
        </ul>
        <button @click="showModal = true">Удалить</button>
        <ModalView v-show="showModal">
            <h3>Вы уверены, что хотите удалить заметку?</h3>
            <button type="button" @click="deleteNote(note.id)">Удалить</button>
            <button type="button" @click="showModal = false">Отмена</button>
        </ModalView>
    </li>
</template>

<script>
import ModalView from "@/components/ModalView.vue";

export default {
    components: {
        ModalView,
    },
    props: {
        note: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            showModal: false,
        };
    },
    methods: {
        deleteNote(noteId) {
            this.$store.dispatch('deleteNote', noteId);
            this.$store.dispatch('reassignIds')
            this.showModal = false;
        },
    },
};
</script>
