<template>
    <div>
        <ul>
            <TodoItem
                    v-for="(todo, index) in todos"
                    :key="todo.id"
                    :todo="todo"
                    @remove="removeTodo(index)"
            />
        </ul>
    </div>
</template>

<script>
import TodoItem from "@/components/FormNote/TodoItem.vue";

export default {
    components: {
        TodoItem,
    },
    props: {
        todos: {
            type: Array,
            required: true,
        },
    },
    methods: {
        removeTodo(index) {
            this.todos.splice(index, 1);
        },
    },
};
</script>
