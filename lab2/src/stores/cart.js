import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],
    authenticated: false,
    totalPrice: 0,
  }),
  actions: {
    addItemToCart(newItem) {
      const existingItem = this.items.filter((item) => item.id === newItem.id);
      if (existingItem.length > 0) {
        this.items.map((item) =>
          item.id === newItem.id ? { ...item, quantity: ++item.quantity } : item
        );
      } else {
        this.items.push({ ...newItem, quantity: 1 });
      }

      this.calculateTotalPrice();
    },
    deleteItemFromCart(itemId) {
      this.items = this.items.filter((item) => item.id !== itemId);

      this.calculateTotalPrice();
    },
    changeQuantity(itemId, quantity) {
      if (quantity > 1)
        this.items.map((item) => (item.id === itemId ? { ...item, quantity } : item));

      this.calculateTotalPrice();
    },
    calculateTotalPrice() {
      this.totalPrice = this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    },
    clearAll() {
      this.items = [];
    },
  },
});
