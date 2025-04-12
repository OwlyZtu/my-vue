<script setup>
import { computed, ref } from 'vue';
import { useCartStore } from '../stores/cart.js';
import { useAuthStore } from '../stores/auth';
import CartItem from '../components/CartItem.vue';
import Button from '../components/Button.vue';

const cartStore = useCartStore();
const authStore = useAuthStore();
let confirmed = ref(false);

const clearCart = () => {
  cartStore.clearAll();
};

const confirmOrder = () => {
  confirmed = ref(true);
  cartStore.clearAll();
};

computed(() => cartStore.totalPrice);
const itemsCount = computed(() => cartStore.items.length);
</script>

<template>
  <div class="w-full flex flex-col items-center">
    <div class="w-full flex justify-between px-6 pt-2 items-center">
      <p class="text-xl">{{ $t('cart.title') }}</p>

      <div v-if="itemsCount > 0">
        <Button @click="clearCart" :label="$t('cart.clear')" />
      </div>
    </div>

    <div v-if="itemsCount < 1 && !confirmed">
      <p>{{ $t('cart.empty') }}</p>
    </div>

    <div v-if="confirmed">
      <p>{{ $t('cart.confirmed') }}</p>
    </div>

    <div v-if="itemsCount > 0" class="w-full flex flex-col flex-wrap gap-1 p-3">
      <div v-for="item in cartStore.items">
        <CartItem :product="item" />
      </div>
      <div class="w-full flex items-center gap-3 justify-between my-5">
        <p>{{ $t('cart.total') }}: {{ cartStore.totalPrice }}$</p>
        <div v-if="authStore.user">
          <Button @click="confirmOrder" label="Confirm order" />
        </div>
        <div v-if="!authStore.user">
          <p class="text-red-800">{{ $t('cart.login_first') }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
