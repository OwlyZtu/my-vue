<template>
    <div class="space-y-2">
        <label class="block font-medium">{{ question.prompt }}</label>
        <div 
            v-for="(option, index) in question.options" 
            :key="index" 
            class="flex items-center space-x-2 my-1"
        >
            <input 
                type="radio" 
                :id="`option-${index}`" 
                :value="option" 
                v-model="selectedOption"
                :aria-label="option"
                :aria-checked="selectedOption === option"
                class="form-radio text-blue-500 focus:ring-blue-500 h-5 w-5 cursor-pointer" 
            />
            <label 
                :for="`option-${index}`" 
                class="text-gray-700 cursor-pointer select-none"
            >
                {{ option }}
            </label>
        </div>
        <span 
            v-if="error" 
            class="text-red-500 text-sm block" 
            role="alert"
        >
            {{ error }}
        </span>
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
        validator: (obj) => Array.isArray(obj.options) && obj.options.length > 0
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

const { value: selectedOption, errorMessage: error } = useField(
    'selectedOption',
    yup.string().required(t('validation.selectAnOption'))
);

const emit = defineEmits(['update:modelValue']);

watch(selectedOption, (newValue) => {
    emit('update:modelValue', newValue || '');
}, { immediate: true });

onMounted(() => {
    selectedOption.value = props.modelValue || '';
});
</script>
