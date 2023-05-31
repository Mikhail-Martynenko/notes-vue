<template>
  <div>
    <h2>Изменение заметки</h2>
    <form @submit.prevent="updateNote">
      <label for="title">Название:</label>
      <input type="text" id="title" v-model="note.title" required/>
      <label for="todo">Задачи:</label>
      <ul>
        <li v-for="(todo, index) in note.todos" :key="index">
          <input type="checkbox" v-model="todo.completed"/>
          <input type="text" v-model="todo.text" required/>
          <button type="button" @click="removeTodo(index)">Удалить</button>
        </li>
      </ul>
      <button type="button" @click="addTodo">Добавить задачу</button>
      <button type="submit">Сохранить</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      note: null,
    };
  },
  created() {
    const noteId = this.$route.params.id;
    // Найдем заметку по ее идентификатору
    this.note = this.$root.notes.find((note) => note.id === parseInt(noteId));
    if (!this.note) {
      // Если заметка не найдена, перенаправим на главную страницу
      this.$router.push('/');
    }
  },
  methods: {
    addTodo() {
      this.note.todos.push({text: '', completed: false});
    },
    removeTodo(index) {
      this.note.todos.splice(index, 1);
    },
    updateNote() {
      // Здесь можно добавить код для сохранения изменений настоящим образом
      this.$router.push('/');
    },
  },
};
</script>
