<template>
  <label for="showAll">Voir tous les todos</label>
  <input type="checkbox" id="showAll" v-model="voirTout" />
  <TodoList :showAll="voirTout"></TodoList>
</template>
<script setup lang="ts">
import { ref, type Ref } from 'vue'
import TodoList from '../components/TodoList.vue'

const voirTout: Ref<boolean> = ref(true)
</script>
