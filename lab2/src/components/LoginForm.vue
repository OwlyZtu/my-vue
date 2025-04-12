<script setup>
import { reactive, ref } from 'vue';
import * as yup from 'yup';
import Button from './Button.vue';
import { useAuthStore } from '../stores/auth';

const authStore = useAuthStore();

const schema = yup.object({
  name: yup.string().required('Provide your name'),
  password: yup.string().required('Create a password'),
});

const formData = reactive({
  name: '',
  password: '',
});

const errors = reactive({});
const submitted = ref(false);

const submitForm = async () => {
  try {
    Object.keys(formData).forEach((key) => (errors[key] = ''));
    await schema.validate(formData, { abortEarly: false });

    authStore.setUser(formData);
    submitted.value = true;
  } catch (validationErrors) {
    console.log(validationErrors);
    validationErrors.inner.forEach((error) => {
      errors[error.path] = error.message;
    });

    submitted.value = false;
  }
};
</script>

<template>
  <div v-if="!submitted">
    <form
      @submit.prevent="submitForm"
      class="flex flex-col justify-center w-max min-w-96 bg-slate-300 rounded gap-3 p-5"
    >
      <label>
        {{ $t('user.username') }}:
        <input type="text" v-model="formData.name" class="rounded px-1 w-full" />
        <p v-if="errors.name" class="text-red-600">{{ errors.name }}</p>
      </label>

      <label>
        {{ $t('user.password') }}:
        <input type="password" v-model="formData.password" class="rounded px-1 w-full" />
        <p v-if="errors.password" class="text-red-600">{{ errors.password }}</p>
      </label>

      <Button :label="$t('user.confirm')" />
    </form>
  </div>

  <div v-if="submitted">
    <p>{{ $t('user.greeting') }}, {{ authStore.user?.name }}!</p>
    <Button @click="authStore.clearUser" :label="$t('logout')" />
  </div>
</template>
