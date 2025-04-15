<script setup>
import {ref, defineAsyncComponent} from 'vue';

const ArchivedList = defineAsyncComponent(() =>
    import('./components/Archive.vue')
);
const TodoList = defineAsyncComponent(() =>
    import('./components/List.vue')
);

const showActive = ref(true);
</script>

<template>
  <div class="w-full min-h-screen p-3 m-0">
    <div class="w-full flex items-center justify-center gap-5">
      <h1 class="text-2xl font-bold">
        {{ showActive ? 'ToDo List' : 'Archive' }}
      </h1>
    </div>
    <div class="w-full flex items-center justify-center gap-5">
      <button
          @click="showActive = !showActive"
          class="bg-cyan-700 hover:bg-cyan-400 hover:text-black p-2 rounded transition-all"
      >
        {{ showActive ? 'Archive' : 'Active' }}
      </button>
      </div>
      <KeepAlive>
        <component :is="showActive ? TodoList : ArchivedList"/>
      </KeepAlive>
  </div>
</template>
