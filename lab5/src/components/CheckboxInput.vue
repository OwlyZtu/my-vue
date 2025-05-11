<template>
    <div class="space-y-2">
        <label class="block font-medium">{{ question.prompt }}</label>
        <div 
            v-for="(option, index) in question.options" 
            :key="index" 
            class="flex items-center space-x-2 my-1"
        >
            <input 
                type="checkbox" 
                :id="`option-${index}`" 
                :value="option" 
                v-model="selectedOptions"
                :aria-label="option"
                :aria-checked="(selectedOptions || []).includes(option)"
                class="form-checkbox text-blue-500 focus:ring-blue-500 h-5 w-5 cursor-pointer transition-all duration-200" 
            />
            <label :for="`option-${index}`" class="text-gray-700 cursor-pointer select-none">{{ option }}</label>
        </div>
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
        validator: (obj) => Array.isArray(obj.options) && obj.options.length > 0
    },
    modelValue: {
        type: Array,
        default: () => []
    },
    errors: {
        type: String,
        default: ''
    }
});

const { value: selectedOptions, errorMessage: error } = useField(
    'selectedOptions',
    yup.array()
        .min(1, t('validation.selectAtLeastOne')),
    {
        initialValue: []
    }
);

const emit = defineEmits(['update:modelValue']);

watch(selectedOptions, (newValue) => {
    emit('update:modelValue', newValue || []);
}, { immediate: true });

onMounted(() => {
    selectedOptions.value = Array.isArray(props.modelValue) ? [...props.modelValue] : [];
});
</script>
