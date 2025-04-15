<script setup>
import { inject } from 'vue';
import TodoForm from './Form.vue';
import TodoItem from './Item.vue';

const taskManager = inject('taskManager', {}); // Запобігає падінню, якщо provider не знайдено
const { activeList = [], createTask, toggleTask, deleteTask, editTask } = taskManager;
</script>

<template>
  <div class="p-3 flex flex-col gap-5">
    <TodoForm @create="createTask" />
    <TodoItem
      v-for="task in activeList"
      :key="task.id"
      :task="task"
      @toggle="toggleTask"
      @delete="deleteTask"
      @edit="editTask"
    />
  </div>
</template>
