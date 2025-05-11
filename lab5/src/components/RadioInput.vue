<template>
    <div class="space-y-2">
        <label class="block font-medium">{{ question.prompt }}</label>
        <div class="space-y-1">
            <div 
                v-for="option in options" 
                :key="option.value"
                class="flex items-center space-x-2"
            >
                <input 
                    type="radio" 
                    :id="option.id" 
                    :value="option.value" 
                    v-model="yesNoAnswer"
                    :aria-label="option.label"
                    :aria-checked="yesNoAnswer === option.value"
                    class="form-radio text-blue-500 focus:ring-blue-500 h-5 w-5 cursor-pointer transition-all duration-200" 
                />
                <label 
                    :for="option.id" 
                    class="text-gray-700 cursor-pointer select-none hover:text-blue-600 transition-colors duration-200"
                >
                    {{ option.label }}
                </label>
            </div>
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
import { ref, watch, computed, onMounted } from 'vue';
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

const options = computed(() => [
    { id: 'yes', value: 'Yes', label: 'Так' },
    { id: 'no', value: 'No', label: 'Ні' }
]);

const { value: yesNoAnswer, errorMessage: error } = useField(
    'yesNoAnswer',
    yup.string().required(t('validation.required'))
);

const emit = defineEmits(['update:modelValue']);

watch(yesNoAnswer, (newValue) => {
    emit('update:modelValue', newValue || '');
}, { immediate: true });

onMounted(() => {
    yesNoAnswer.value = props.modelValue || '';
});
</script>
