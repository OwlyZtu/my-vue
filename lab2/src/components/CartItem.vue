<script setup>
import { useCartStore } from '../stores/cart.js';
import Button from './Button.vue';

const props = defineProps({
  product: {
    type: {
      id: Number,
      name: String,
      price: Number,
      description: String,
    },
  },
});

const cartStore = useCartStore();

const deleteFromCart = () => {
  cartStore.deleteItemFromCart(props.product.id);
};

const increaseQuantity = () => {
  cartStore.changeQuantity(props.product.id, ++props.product.quantity);
};

const decreaseQuantity = () => {
  if (props.product.quantity > 1)
    cartStore.changeQuantity(props.product.id, --props.product.quantity);
};
</script>

<template>
  <div class="w-full bg-slate-300 rounded gap-5 flex text-center p-3 justify-left items-center">
    <p class="mr-auto">{{ product.name }}</p>
    <p class="mr-3">{{ product.price }}$</p>
    <div class="gap-2 flex items-center">
      <Button label="-" @click="decreaseQuantity" />
      <p class="font-semibold">{{ product.quantity }}</p>
      <Button label="+" @click="increaseQuantity" />
    </div>
    <Button @click="deleteFromCart" :label="$t('product.delete')" :red="true" />
  </div>
</template>
