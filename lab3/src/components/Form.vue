<script setup>
import { ref, reactive, onMounted, watch } from 'vue';

const props = defineProps({
  initialTask: {
    type: Object,
    default: () => ({
      id: null,
      title: '',
      description: '',
      active: true,
      created: new Date(),
      priority: 'low',
      deadline: null,
    }),
  },
  isEditing: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['create', 'edit', 'cancel']);

const task = reactive({ ...props.initialTask });
const titleInput = ref(null);

function submitForm() {
  if (!task.title) {
    alert('You must fill in the required fields.');
    return;
  }

  if (props.isEditing) {
    emit('edit', { ...task });
  } else {
    task.id = Date.now();
    emit('create', { ...task });
    resetForm();
  }
}

function resetForm() {
  Object.assign(task, props.initialTask);
}

function cancelAction() {
  emit('cancel');
}

watch(
    () => props.initialTask,
    (newTask) => {
      Object.assign(task, newTask);
    },
    { deep: true, immediate: true }
);

onMounted(() => {
  titleInput.value?.focus();
});
</script>

<template>
  <transition name="fade">
    <form
      @submit.prevent="submitForm"
      class="flex flex-col gap-2 relative pb-16 w-full p-5 rounded-lg border-2 border-blue-700"
    >
      <slot name="title" :value="task.title">
        <label  class="w-full flex gap-2 items-center">Title:
          <input
            v-model="task.title"
            ref="titleInput"
            required
            class="w-full outline-none border-b-4 border-zinc-600 focus:border-purple-600 bg-zinc-100 py-1 px-2 rounded"
          />
        </label>
      </slot>

      <slot name="description" :value="task.description">
        <label  class="w-full flex gap-2 items-center">Description:
          <textarea
            v-model="task.description"
            class="w-full outline-none border-b-4 border-zinc-600 focus:border-purple-600 bg-zinc-100 py-1 px-2 rounded min-h-20"
          >
          </textarea>
        </label>
      </slot>

      <slot name="priority" :value="task.priority">
        <label class="w-full flex gap-2 items-center">
          Priority:
          <select
            v-model="task.priority"
            required
            class="outline-none border-b-4 border-zinc-600 focus:border-purple-600 bg-zinc-100 py-1 px-2 rounded"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </label>
      </slot>

      <slot name="deadline" :value="task.deadline">
        <label>
          Deadline:
          <input
            type="datetime-local"
            v-model="task.deadline"
            class="outline-none border-b-4 border-zinc-600 focus:border-purple-600 bg-zinc-100 py-1 px-2 rounded"
          />
        </label>
      </slot>

      <button
        type="submit"
        class="absolute bottom-5 right-5 bg-green-400 hover:bg-green-100 px-2 py-1 rounded-xl transition-all"
      >
        Save
      </button>
      <div v-if="isEditing">
        <button
          type="button"
          @click="cancelAction"
          class="absolute bottom-5 left-5 bg-purple-400 hover:bg-purple-100 px-2 py-1 rounded-xl transition-all"
        >
          Cancel
        </button>
      </div>
    </form>
  </transition>
</template>
