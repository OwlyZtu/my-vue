<script setup>
import {ref, defineAsyncComponent, nextTick} from 'vue';

const TodoForm = defineAsyncComponent(() => import('./Form.vue'));

const props = defineProps({ task: Object });
const emit = defineEmits(['delete', 'edit', 'toggle']);

const isEditing = ref(false);
const todoFormRef = ref(null);

function startEditing() {
  isEditing.value = true;
  nextTick(() => {
    if (todoFormRef.value) {
      todoFormRef.value.focus();
    }
  });
}

function cancelEditing() {
  isEditing.value = false;
}

function editThis(editTask) {
  cancelEditing();
  emit('edit', editTask);
}

const emitDelete = (id) => {
  emit('delete', id);
};

const emitToggle = (id) => {
  emit('toggle', id);
};
</script>

<template>
  <div>
    <transition name="fade" mode="out-in">
      <div
          v-if="!isEditing"
          key="view"
          class="p-5 rounded-lg relative w-full border-2 border-blue-500 bg-blue-100 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-y-110"
      >
        <slot name="title" :task="task">
          <div class="w-full flex gap-3">
            <button @click="emitToggle(task.id)" class="border-black border-2 p-1 rounded transition-all">
                {{ task.active ? 'Done' : 'Not finished' }}
            </button>
              <h3 class="text-lg font-semibold text-wrap text-left">
                {{ task.title }}
              </h3>

          </div>
        </slot>


        <slot name="details" :task="task">
          <div class="flex gap-1">
            <div class="flex gap-2 mb-4 justify-around">
              <p>Priority: {{ task.priority }}</p>
              <p>
                Deadline:
                {{
                  task.deadline
                      ? new Date(task.deadline).toLocaleString()
                      : 'None'
                }}
              </p>
            </div>

            <p v-if="task.description" class="mb-2">
              Details: {{ task.description }}
            </p>

            <p class="text-sm">
              Created: {{ new Date(task.created).toLocaleString() }}
            </p>
            <p v-if="task.done" class="text-sm">
              Done: {{ new Date(task.done).toLocaleString() }}
            </p>
          </div>
        </slot>


        <slot name="editOrDel" :task="task">
          <div :class="`flex gap-3 ${!task.active ? 'justify-end' : 'justify-between' }`">
            <button
                v-if="task.active"
                @click="startEditing"
                class="bg-orange-400 hover:bg-orange-600 px-2 py-1 rounded-xl transition-all"
            >
              Edit
            </button>

            <button
                @click="emitDelete(task.id)"
                class="bg-red-600 hover:bg-red-900 text-white px-2 py-1 rounded-xl transition-all"
            >
              Del
            </button>
          </div>
        </slot>

      </div>

      <div v-else key="edit">
        <component
            :is="TodoForm"
            :initialTask="task"
            :isEditing="true"
            @edit="editThis"
            @cancel="cancelEditing"
            ref="todoFormRef"
        />
      </div>
    </transition>
  </div>
</template>
