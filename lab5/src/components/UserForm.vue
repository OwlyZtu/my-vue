<template>
    <form @submit.prevent="onSubmit" class="max-w-md mx-auto" novalidate>
        <div 
            v-if="notification" 
            class="mb-4 p-3 bg-red-50 text-red-600 rounded" 
            role="alert"
        >
            {{ notification }}
        </div>

        <FormField 
            v-for="field in formFields" 
            :key="field.name"
            v-bind="field"
            :value="values[field.name]"
            :error="touched[field.name] && errors[field.name]"
            @input="setFieldValue(field.name, $event)"
            @blur="validateField(field.name)"
        />

        <button 
            type="submit"
            class="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-200"
            :aria-label="$t('userForm.startTest')"
        >
            {{ $t('userForm.startTest') }}
        </button>
    </form>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import FormField from './FormField.vue';

const { t } = useI18n();
const emit = defineEmits(['submit']);

const formFields = computed(() => [
    {
        name: 'name',
        type: 'text',
        label: t('userForm.name'),
        required: true
    },
    {
        name: 'age',
        type: 'number',
        label: t('userForm.age'),
        required: true
    },
    {
        name: 'email',
        type: 'email',
        label: t('userForm.email'),
        required: true
    },
    {
        name: 'phone',
        type: 'tel',
        label: t('userForm.phone'),
        required: true
    },
    {
        name: 'gender',
        type: 'select',
        label: t('userForm.gender'),
        required: true,
        options: [
            { value: '', label: t('userForm.selectGender'), disabled: true },
            { value: 'male', label: t('userForm.male') },
            { value: 'female', label: t('userForm.female') },
            { value: 'other', label: t('userForm.other') }
        ]
    }
]);

const touched = reactive({
    name: false,
    age: false,
    email: false,
    phone: false,
    gender: false
});

const validationSchema = yup.object({
    name: yup
        .string()
        .trim()
        .min(2, t('validation.minLength', { min: 2 }))
        .required(t('validation.required')),
    age: yup
        .number()
        .typeError(t('validation.required'))
        .min(18, t('validation.minAge'))
        .required(t('validation.required')),
    email: yup
        .string()
        .email(t('validation.email'))
        .required(t('validation.required')),
    phone: yup
        .string()
        .matches(/^\d{10}$/, t('validation.phone'))
        .required(t('validation.required')),
    gender: yup
        .string()
        .required(t('validation.required'))
});

const { handleSubmit, errors, values, setFieldValue, validateField } = useForm({
    validationSchema,
    initialValues: {
        name: '',
        age: '',
        email: '',
        phone: '',
        gender: ''
    }
});

const notification = ref('');

const onSubmit = handleSubmit(
    (values) => {
        console.log('Form values:', values);
        emit('submit', values);
    },
    (e) => {
        Object.keys(touched).forEach(key => touched[key] = true);
        console.log('Validation errors:', e);
        notification.value = t('validation.required');
    }
);
</script>
