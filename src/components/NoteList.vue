<template>
  <div class="hello">
    <h1>Список заметок</h1>
    <ul>
      <li v-for="note in allNotes" :key="note.id">
        <h3>{{ note.title }}</h3>
        <ul>
          <li v-for="todo in note.todos" :key="todo.id">
            <input type="checkbox" disabled/>
            <label>{{ todo.text }}</label>
          </li>
        </ul>
        <router-link :to="`/edit/${note.id}`">Изменить</router-link>
        <button @click="deleteNote(note.id)">Удалить</button>
      </li>
    </ul>
    <router-link to="/create">Создать новую заметку</router-link>
  </div>
</template>

<script>
export default {
  computed: {
    allNotes() {
      return this.$store.getters.allNotes;
    }
  },
  methods: {
    deleteNote(noteId) {
      if (confirm('Вы уверены, что хотите удалить заметку?')) {
        this.$store.commit('deleteNote', noteId);
      }
    },
  },
};
</script>

<style scoped>
h1 {
  margin-bottom: 1.5rem;
}

ul {
  list-style-type: none;
  padding-left: 0;
}

li {
  margin-bottom: 0.5rem;
}

button {
  margin-top: 1rem;
}
</style>
