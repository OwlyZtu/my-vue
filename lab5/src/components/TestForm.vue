<template>
    <div class="max-w-2xl mx-auto px-8 my-5">
        <h2 class="italic mb-5" role="heading">
            {{ $t('questionForm.question') }} {{ currentQuestionIndex + 1 }} {{ $t('questionForm.of') }} {{ questions.length }}
        </h2>

        <component 
            :is="currentQuestion.component" 
            v-model="answers[currentQuestionIndex]"
            :question="{
                ...currentQuestion,
                prompt: $t(currentQuestion.prompt)
            }"
            
            :errors="errors[currentQuestionIndex]" 
            class="mb-6" 
        />

        <div class="flex gap-4 justify-center mt-8">
            <button 
                @click="prevQuestion" 
                :disabled="isFirstQuestion"
                :aria-label="$t('questionForm.previous')"
                class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {{ $t('questionForm.previous') }}
            </button>
            <button 
                @click="nextQuestion" 
                :disabled="isLastQuestion"
                :aria-label="$t('questionForm.next')"
                class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {{ $t('questionForm.next') }}
            </button>
            <button 
                v-if="isLastQuestion" 
                @click="submitTest"
                :aria-label="$t('questionForm.finish')"
                class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
                {{ $t('questionForm.finish') }}
            </button>
        </div>

        <div v-if="testCompleted" class="mt-8 p-4 bg-gray-50 rounded-lg" role="alert">
            <h3 class="text-xl font-bold mb-4">{{ $t('completion.testCompleted') }}</h3>
            <p v-if="hasUnansweredQuestions" class="text-red-600">
                {{ $t('completion.unansweredQuestions') }}{{ unansweredQuestions.join(', ') }}
            </p>
            <div v-else class="space-y-2">
                <p class="font-semibold">
                    {{ $t('completion.correctAnswers') }}{{ correctAnswers }}
                </p>
                <p class="font-semibold">
                    {{ $t('completion.successPercentage') }}{{ successPercentage }}%
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { questions } from '../data/questions';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();



const answers = reactive(Array(questions.length).fill(null));
const currentQuestionIndex = ref(0);
const testCompleted = ref(false);
const unansweredQuestions = ref([]);
const correctAnswers = ref(0);


const { validate } = useForm({
    validationSchema: yup.object(
        questions.reduce((schema, question, index) => {
            schema[index] = question.validationSchema;
            return schema;
        }, {})
    ),
});


const currentQuestion = computed(() => questions[currentQuestionIndex.value]);
const isFirstQuestion = computed(() => currentQuestionIndex.value === 0);
const isLastQuestion = computed(() => currentQuestionIndex.value === questions.length - 1);
const hasUnansweredQuestions = computed(() => unansweredQuestions.value.length > 0);
const successPercentage = computed(() => ((correctAnswers.value / questions.length) * 100).toFixed(2));

const valiDateInput = async (index) => {
    try {
        const question = questions[index];
        await question.validationSchema.validate(answers[index]);
        errors[index] = null;
        return true;
    } catch (error) {
        errors[index] = error.message;
        return false;
    }
};

const calculateResults = () => {
    correctAnswers.value = answers.reduce((score, answer, index) => {
        const question = questions[index];
        
        if (!answer) return score;

        switch (question.type) {
            case 'text':
                return score + (question.keywords.every(keyword => 
                    answer.toLowerCase().includes(keyword.toLowerCase())) ? 1 : 0);
            
            case 'multiple':
                return score + (Array.isArray(answer) && 
                    answer.length === question.correctAnswer.length &&
                    [...answer].sort().every((val, i) => val === [...question.correctAnswer].sort()[i]) ? 1 : 0);
            
            default:
                return score + (answer === question.correctAnswer ? 1 : 0);
        }
    }, 0);
};

const nextQuestion = async () => {
    if (!isLastQuestion.value && await valiDateInput(currentQuestionIndex.value)) {
        currentQuestionIndex.value++;
    }
};

const prevQuestion = () => {
    if (!isFirstQuestion.value) {
        currentQuestionIndex.value--;
    }
};

const submitTest = async () => {
    if (await validate()) {
        unansweredQuestions.value = answers
            .map((answer, index) => answer === null ? index + 1 : null)
            .filter(Boolean);

        if (!hasUnansweredQuestions.value) {
            calculateResults();
            testCompleted.value = true;
        }
    }
};


const errors = reactive(Array(questions.length).fill(null));

</script>

<style scoped>
.navigation {
    display: flex;
    gap: 10px;
    margin-top: 20px;
}

button {
    padding: 10px;
    font-size: 1em;
}

span {
    color: red;
    font-size: 0.9em;
}

.error {
    color: red;
    font-size: 1em;
}
</style>