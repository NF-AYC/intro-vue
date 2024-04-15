<template>
  <div @click="toogleTodo">
    <h2>Todo : {{ todo.title }}</h2>
    <p>Statut : {{ todo.completed ? 'Terminé' : 'Non terminé' }}</p>
  </div>
</template>

<script lang="ts" setup>
import type { Todo } from '../models/Todo'

const props = defineProps<{ todo: Todo }>()

const emits = defineEmits<{
  (e: 'update:completed', completed: boolean): void
}>()

const toogleTodo = () => {
  console.log(`le todo ${props.todo.title} a emis update : ${!props.todo.completed}`)
  emits('update:completed', !props.todo.completed)
}
</script>
