<template>
    <li :key="note.id">
        <router-link :to="'/edit/' + note.id">{{ note.title }}</router-link>
        <ul>
            <TodoItem v-for="todo in note.todos" :key="todo.id" :todo="todo">
                <input type="checkbox" disabled :checked="todo.completed" />
                <label>{{ todo.text }}</label>
            </TodoItem>
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
import TodoItem from "@/components/TodoItem.vue";

export default {
    components: {
        TodoItem,
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
            this.showModal = false;
        },
    },
};
</script>
