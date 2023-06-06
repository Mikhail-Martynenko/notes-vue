<template>
    <div class="list">
        <CreateNote />
        <h1>Список заметок</h1>
        <ul>
            <NoteItem v-for="note in this.allNotes()" :key="note.id" :note="note" />
        </ul>
    </div>
</template>

<script>
import CreateNote from "@/components/CreateNote.vue";
import EditNote from "@/components/EditNote.vue";
import {mapGetters} from "vuex";
import ModalView from "@/components/ModalView.vue";
import NoteItem from "@/components/NoteItem.vue";

export default {
    components: {
        NoteItem,
        ModalView,
        EditNote,
        CreateNote,
    },
    methods: {
        ...mapGetters(['allNotes']),
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