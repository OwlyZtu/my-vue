<script setup>
import {inject} from 'vue';
import TodoItem from "./Item.vue";

const {archiveList, toggleTask, deleteTask} = inject('taskManager');
</script>

<template>
  <div v-for="task in archiveList"
       :key="task.id"
       class="p-3 flex flex-col gap-5">
    <TodoItem :task="task"
              @toggle="toggleTask"
              @delete="deleteTask"/>
  </div>
</template>
