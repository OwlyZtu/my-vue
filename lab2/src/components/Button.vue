<script setup>
import { computed } from 'vue';

const props = defineProps({
  label: String,
  red: Boolean,
});

const defaultLabel = 'Submit';
const buttonLabel = computed(() => props.label || defaultLabel);
const buttonClass = computed(() => `px-3 py-1 my-1 transition ease-in-out delay-150 hover:-translate-y-1
 hover:scale-110 duration-300 h-12 ${props.red ? 'bg-red-900 hover:bg-red-500' : "bg-lime-900 hover:bg-lime-500"} text-white `);
</script>

<template>
  <button v-bind="$attrs" :class="buttonClass">
    {{ buttonLabel }}
  </button>
</template>
