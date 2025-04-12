<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { useProductStore } from '../stores/products';
import { useCartStore } from '../stores/cart.js';
import Button from '../components/Button.vue';

const route = useRoute();
const productStore = useProductStore();
const product = ref(productStore.getById(route.params.id));
const cartStore = useCartStore();
</script>

<template>
  <div class="h-max m-12 p-5 justify-items-center">
    <div v-if="product">
      <p class="text-center text-xl font-semibold my-12">{{ product.name }}</p>
      <p class="italic">{{ product.description }}</p>
      <div class="mt-5 flex gap-5 justify-between">
        <p>{{ $t('product.price') }}: {{ product.price }}$</p>
        <Button :label="$t('product.add_to_cart')" @click="cartStore.addItemToCart(product)" />
      </div>
    </div>
    <div v-if="!product">
      <p>{{ $t('product.notFound') }}</p>
    </div>
  </div>
</template>
