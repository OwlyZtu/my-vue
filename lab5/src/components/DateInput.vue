<template>
    <div class="space-y-2">
        <label class="block font-medium">{{ question.prompt }}</label>
        <input 
            type="date" 
            v-model="dateAnswer"
            :aria-label="question.prompt"
            :aria-invalid="!!error"
            class="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:outline-none" 
        />
        <span v-if="error" class="text-red-500 text-sm block" role="alert">{{ error }}</span>
    </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { useField } from 'vee-validate';
import * as yup from 'yup';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const props = defineProps({
    question: {
        type: Object,
        required: true
    },
    modelValue: {
        type: String,
        default: ''
    },
    errors: {
        type: String,
        default: ''
    }
});

const { value: dateAnswer, errorMessage: error } = useField(
    'dateAnswer',
    yup
        .date()
        .typeError('Будь ласка, введіть правильну дату')
        .required('Це поле обов\'язкове')
);

const emit = defineEmits(['update:modelValue']);

watch(dateAnswer, (newValue) => {
    emit('update:modelValue', newValue);
}, { immediate: true });

onMounted(() => {
    dateAnswer.value = props.modelValue;
});
</script>
