<template>
  <div>
    <h2>Создание заметки</h2>
    <form @submit.prevent="saveNote">
      <label for="title">Название:</label>
      <input type="text" id="title" v-model="newNote.title" required/>
      <label for="todo">Задачи:</label>
      <ul>
        <li v-for="(todo, index) in newNote.todos" :key="index">
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
      newNote: {
        title: '',
        todos: [{text: '', completed: false}],
      },
    };
  },
  methods: {
    addTodo() {
      this.newNote.todos.push({text: '', completed: false});
    },
    removeTodo(index) {
      this.newNote.todos.splice(index, 1);
    },
    saveNote() {
      this.$store.commit('addNote', {...this.newNote, id: Date.now()});
      this.newNote.title = '';
      this.newNote.todos = [{text: '', completed: false}];
      console.log(this.$store.todos)
    },
  },
};
</script>
