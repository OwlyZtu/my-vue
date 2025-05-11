<template>
    <div class="space-y-2">
        <label class="block font-medium">{{ question.prompt }}</label>
        <input 
            type="text" 
            v-model="textAnswer" 
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
        required: true,
        validator: (obj) => Array.isArray(obj.keywords) && obj.keywords.length > 0
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

const { value: textAnswer, errorMessage: error } = useField(
    'textAnswer',
    yup
        .string()
        .trim()
        .required('Це поле обов\'язкове')
        .test(
            'contains-keywords',
            `Відповідь повинна містити ключові слова: ${props.question.keywords.join(', ')}`,
            (value) => {
                if (!value) return false;
                const normalizedValue = value.toLowerCase();
                return props.question.keywords.every((keyword) =>
                    normalizedValue.includes(keyword.toLowerCase().trim())
                );
            }
        )
);

const emit = defineEmits(['update:modelValue']);

watch(textAnswer, (newValue) => {
    emit('update:modelValue', newValue?.trim() || '');
}, { immediate: true });

onMounted(() => {
    textAnswer.value = props.modelValue?.trim() || '';
});
</script>
