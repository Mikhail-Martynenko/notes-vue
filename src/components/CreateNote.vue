<template>
    <div class="createNote">
        <h2>Создание заметки</h2>
        <FormNote :allNotes="allNotes" />
    </div>
</template>

<script>
import {mapGetters} from "vuex";
import FormNote from "@/components/FormNote.vue";

export default {
    components: {
        FormNote,
    },
    computed: {
        ...mapGetters(["allNotes"]),
    },
};
</script>

<style scoped>
.createNote {
    display: flex;
    flex-direction: column;
    gap: 20px;
}
</style>
