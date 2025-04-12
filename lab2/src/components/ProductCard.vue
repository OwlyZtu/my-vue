<script setup>
import { useCartStore } from '../stores/cart.js';
import Button from './Button.vue';

const cartStore = useCartStore();
const props = defineProps({
  product: {
    type: {
      id: Number,
      name: String,
      price: Number,
      description: String
    }
  }
});
</script>

<template>
  <div
    class="w-72 h-60 p-3 border-lime-600 border-4 border-solid hover:border-dotted rounded gap-5 flex flex-col justify-between shadow-xl">
    <div class="text-center">
      <router-link :to="'/product/' + product.id" class="text-lg font-semibold hover:underline">{{
          product.name
        }}
      </router-link>
      <p>{{ product.description.slice(0, 80) + '...' }}</p>
    </div>
    <p class="mt-auto text-center">
      <span class="font-semibold">{{ product.price }}$</span>
    </p>
    <Button :label="$t('product.add_to_cart')" @click="cartStore.addItemToCart(product)"
            />
  </div>
</template>
