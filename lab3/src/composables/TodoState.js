import { reactive, computed } from 'vue';

export function toDoManager() {
  const state = reactive({
    tasks: new Map([
      [
        0,
        {
          id: 0,
          title: 'First task',
          description:
              'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
          active: true,
          created: new Date(),
          priority: 'low',
        },
      ],
      [
        1,
        {
          id: 1,
          title: 'Second task',
          active: true,
          created: new Date(),
          priority: 'medium',
          deadline: '2024-01-21T14:01',
        },
      ],
      [
        2,
        {
          id: 2,
          title: 'Third task',
          description:
              'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
          active: true,
          created: new Date(),
          priority: 'high',
        },
      ],
    ]),
  });

  function createTask(task) {
    state.tasks.set(task.id, task);
  }

  function editTask(task) {
    if (state.tasks.has(task.id)) {
      state.tasks.set(task.id, { ...state.tasks.get(task.id), ...task });
    }
  }

  function deleteTask(id) {
    state.tasks.delete(id);
  }

  function toggleTask(id) {
    const task = state.tasks.get(id);
    if (!task) return;

    task.active = !task.active;
    task.done = task.active ? null : new Date();
  }

  const activeList = computed(() =>
      Array.from(state.tasks.values()).filter((task) => task.active));
  const archiveList = computed(() =>
      Array.from(state.tasks.values()).filter((task) => !task.active));

  return {
    createTask,
    editTask,
    deleteTask,
    toggleTask,
    activeList,
    archiveList,
  };
}
