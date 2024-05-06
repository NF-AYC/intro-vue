<template>
  <h2>La liste des todo</h2>

  <TodoItem
    v-for="todo in list"
    v-bind:todo="todo"
    :key="todo.id"
    @update:completed="toogleTodo($event, todo)"
  ></TodoItem>
</template>
<script setup lang="ts">
import { useTodoStore } from '@/stores/todos'
import type { Todo } from '../models/Todo'
import TodoItem from './TodoItem.vue'
import { computed, ref, type Ref } from 'vue'

const props = withDefaults(defineProps<{ showAll?: boolean }>(), {
  showAll: true
})
const todoStore = useTodoStore()

const list = computed(() => {
  return props.showAll ? todoStore.todoList : todoStore.remainingTodo
})

const toogleTodo = (event: boolean, todo: Todo) => {
  todoStore.manageTodoToggle(todo)
}
</script>
