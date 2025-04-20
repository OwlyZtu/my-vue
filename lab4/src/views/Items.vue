<script setup>
import { ref, onMounted } from 'vue';
import axios from '../services/axios';
import LogoutButton from './Logout.vue';

const items = ref([]);
const newItem = ref('');

const fetchItems = async () => {
  try {
    const { data } = await axios.get('/items');
    items.value = data
      ? Object.entries(data).map(([id, item]) => ({ id, ...item, isEditing: false, prevName: item.name }))
      : [];
  } catch (error) {
    console.error('Error fetching items:', error);
  }
};

const addItem = async () => {
  if (!newItem.value.trim()) return;
  try {
    const { data } = await axios.post('/items', { name: newItem.value });
    items.value.push({ id: data.id, name: newItem.value, isEditing: false, prevName: newItem.value });
    newItem.value = '';
  } catch (error) {
    console.error('Error adding item:', error);
  }
};

const deleteItem = async (id) => {
  try {
    await axios.delete(`/items/${id}`);
    items.value = items.value.filter(item => item.id !== id);
  } catch (error) {
    console.error('Error deleting item:', error);
  }
};

const updateItem = async (item) => {
  try {
    await axios.patch(`/items/${item.id}`, { name: item.name });
    item.isEditing = false;
    item.prevName = item.name;
  } catch (error) {
    console.error('Error updating item:', error);
  }
};

const toggleEditMode = (item) => {
  if (item.isEditing) item.name = item.prevName; // Скасування змін при виході з редагування
  item.isEditing = !item.isEditing;
};

onMounted(fetchItems);
</script>

<template>
  <LogoutButton />
  <div>
    <h2>Items</h2>
    <form @submit.prevent="addItem">
      <input v-model="newItem" placeholder="New Item" required />
      <button type="submit">Add</button>
    </form>
    <ol class="items_container">
      <li v-for="item in items" :key="item.id" class="item">
        <template v-if="item.isEditing">
          <input v-model="item.name" />
          <button @click="updateItem(item)">Save</button>
          <button @click="toggleEditMode(item)">Cancel</button>
        </template>
        <template v-else>
          <span>{{ item.name }}</span>
          <button @click="toggleEditMode(item)">Edit</button>
          <button @click="deleteItem(item.id)">Delete</button>
        </template>
      </li>
    </ol>
  </div>
</template>
