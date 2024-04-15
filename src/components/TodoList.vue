<template>
  <h2>La liste des todo</h2>
  ...
  <template v-if="showAll">
    <TodoItem
      v-for="todo in todoList"
      v-bind:todo="todo"
      :key="todo.id"
      @update:completed="toogleTodo($event, todo)"
    ></TodoItem>
  </template>
  <template v-else>
    <TodoItem
      v-for="todo in remaining"
      v-bind:todo="todo"
      :key="todo.id"
      @update:completed="toogleTodo($event, todo)"
    ></TodoItem>
  </template>
</template>
<script setup lang="ts">
import type { Todo } from '../models/Todo'
import TodoItem from './TodoItem.vue'
import { computed, ref, type Ref } from 'vue'

const props = withDefaults(defineProps<{ showAll?: boolean }>(), {
  showAll: true
})

const todoList: Ref<Todo[]> = ref([
  {
    id: 1,
    title: 'todo 1',
    completed: false
  },
  {
    id: 2,
    title: 'todo 2',
    completed: false
  }
])

const toogleTodo = (event: boolean, todo: Todo) => {
  const t = todoList.value.find((item: Todo) => item.id === todo.id)
  if (t) {
    t.completed = event
  }
}

const remaining = computed(() => todoList.value.filter((item: Todo) => !item.completed))
</script>
