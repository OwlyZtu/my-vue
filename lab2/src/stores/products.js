import { defineStore } from 'pinia';

const descr = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
export const useProductStore = defineStore('product', {
  state: () => ({
    products: [
      { id: '1', name: 'Штука1', price: 70, description: descr },
      { id: '2', name: 'Штука2', price: 70, description: descr },
      { id: '3', name: 'Штука3', price: 70, description: descr },
      { id: '4', name: 'Штука4', price: 70, description: descr },
      { id: '5', name: 'Штука5', price: 70, description: descr },
      { id: '6', name: 'Штука6', price: 70, description: descr },
      { id: '7', name: 'Штука7', price: 70, description: descr },
      { id: '8', name: 'Штука8', price: 70, description: descr },
      { id: '9', name: 'Штука9', price: 70, description: descr },
      { id: '10', name: 'Штука10', price: 70, description: descr },
      { id: '11', name: 'Штука11', price: 70, description: descr },
      { id: '12', name: 'Штука12', price: 70, description: descr },
      { id: '13', name: 'Штука13', price: 70, description: descr },
      { id: '14', name: 'Штука14', price: 70, description: descr },
      { id: '15', name: 'Штука15', price: 70, description: descr },
    ],
  }),
  actions: {
    getById(id) {
      return this.products.filter((item) => item.id === id)[0];
    },
  },
});
