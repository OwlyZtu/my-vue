<template>
    <div class="space-y-2">
        <label class="block font-medium">{{ question.prompt }}</label>
        <input 
            type="number" 
            v-model="numericAnswer" 
            :min="question.min" 
            :max="question.max"
            :aria-label="question.prompt"
            :aria-invalid="!!error"
            :placeholder="getPlaceholder"
            class="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:outline-none" 
        />
        <span v-if="error" class="text-red-500 text-sm block" role="alert">{{ error }}</span>
    </div>
</template>

<script setup>
import { ref, watch, onMounted, computed } from 'vue';
import { useField } from 'vee-validate';
import * as yup from 'yup';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const props = defineProps({
    question: {
        type: Object,
        required: true,
        validator: (obj) => {
            return typeof obj.min === 'number' || typeof obj.max === 'number';
        }
    },
    modelValue: {
        type: Number,
        default: null
    },
    errors: {
        type: String,
        default: ''
    }
});

const getPlaceholder = computed(() => {
    const min = props.question.min !== undefined ? `мін: ${props.question.min}` : '';
    const max = props.question.max !== undefined ? `макс: ${props.question.max}` : '';
    return [min, max].filter(Boolean).join(', ');
});

const { value: numericAnswer, errorMessage: error } = useField(
    'numericAnswer',
    yup
        .number()
        .typeError('Будь ласка, введіть правильне число')
        .required('Це поле обов\'язкове')
        .min(props.question.min ?? Number.NEGATIVE_INFINITY, `Значення має бути не менше ${props.question.min}`)
        .max(props.question.max ?? Number.POSITIVE_INFINITY, `Значення має бути не більше ${props.question.max}`)
);

const emit = defineEmits(['update:modelValue']);

watch(numericAnswer, (newValue) => {
    emit('update:modelValue', typeof newValue === 'number' ? newValue : null);
}, { immediate: true });

onMounted(() => {
    numericAnswer.value = props.modelValue ?? null;
});
</script>
