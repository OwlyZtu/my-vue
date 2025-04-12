<script setup>
import { useProductStore } from '../stores/products';
import ProductCard from '../components/ProductCard.vue';

const productStore = useProductStore();
</script>

<template>
  <div class="w-full flex flex-col  gap-5 py-3 ">
    <div class="w-11/12 flex flex-wrap gap-4 m-auto">
      <div v-for="item in productStore.products">
        <ProductCard :product="item" />
      </div>
    </div>
  </div>
</template>
