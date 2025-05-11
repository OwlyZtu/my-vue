<template>
    <div class="mb-4">
        <label :for="name" class="block text-sm font-medium text-gray-700 mb-1">
            {{ label }}{{ required ? ' *' : '' }}
        </label>
        
        <select 
            v-if="type === 'select'"
            :id="name"
            :name="name"
            :value="value"
            @input="$emit('input', $event.target.value)"
            @blur="$emit('blur')"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
        >
            <option
                v-for="option in options"
                :key="option.value"
                :value="option.value"
                :disabled="option.disabled"
            >
                {{ option.label }}
            </option>
        </select>

        <input
            v-else
            :id="name"
            :name="name"
            :type="type"
            :value="value"
            @input="$emit('input', $event.target.value)"
            @blur="$emit('blur')"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
        />

        <p v-if="error" class="mt-1 text-sm text-red-600" role="alert">
            {{ error }}
        </p>
    </div>
</template>

<script setup>

defineProps({
    name: {
        type: String,
        required: true
    },
    label: {
        type: String,
        required: true
    },
    type: {
        type: String,
        default: 'text'
    },
    value: {
        type: [String, Number],
        default: ''
    },
    required: {
        type: Boolean,
        default: false
    },
    error: {
        type: String,
        default: ''
    },
    options: {
        type: Array,
        default: () => []
    }
});

defineEmits(['input', 'blur']);
</script>