import SelectInput from '../components/SelectInput.vue';
import CheckboxInput from '../components/CheckboxInput.vue';
import NumberInput from '../components/NumberInput.vue';
import RadioInput from '../components/RadioInput.vue';
import DateInput from '../components/DateInput.vue';
import TextInput from '../components/TextInput.vue';
import * as yup from 'yup';


export const questions = [
    {
        type: 'single',
        prompt: 'questions.ocean',
        options: ['Atlantic', 'Pacific', 'Indian', 'Arctic'],
        correctAnswer: 'Pacific',
        component: SelectInput,
        validationSchema: yup.string().required('validation.required'),
    },
    {
        type: 'multiple',
        prompt: 'questions.mammals',
        options: ['Whale', 'Shark', 'Elephant', 'Penguin'],
        correctAnswer: ['Whale', 'Elephant'],
        component: CheckboxInput,
        validationSchema: yup.array().min(1, 'validation.selectAtLeastOne'),
    },
    {
        type: 'numeric',
        prompt: 'questions.moonsOfEarth',
        correctAnswer: 1,
        component: NumberInput,
        validationSchema: yup.number().required('validation.required'),
    },
    {
        type: 'yesno',
        prompt: 'questions.sunStar',
        correctAnswer: 'Yes',
        component: RadioInput,
        validationSchema: yup.string().required('validation.required'),
    },
    {
        type: 'date',
        prompt: 'questions.berlinWallFall',
        correctAnswer: '1989-11-09',
        component: DateInput,
        validationSchema: yup.date().required('validation.validDate'),
    },
    {
        type: 'single',
        prompt: 'questions.painter',
        options: ['Mozart', 'Picasso', 'Shakespeare', 'Tesla'],
        correctAnswer: 'Picasso',
        component: SelectInput,
        validationSchema: yup.string().required('validation.required'),
    },
    {
        type: 'multiple',
        prompt: 'questions.programmingLanguages',
        options: ['HTML', 'Python', 'CSS', 'JavaScript'],
        correctAnswer: ['Python', 'JavaScript'],
        component: CheckboxInput,
        validationSchema: yup.array().min(1, 'validation.selectAtLeastOne'),
    },
    {
        type: 'text',
        prompt: 'questions.internetBenefits',
        keywords: ['communication', 'access', 'information'],
        component: TextInput,
        validationSchema: yup.string().required('validation.required'),
    },
    {
        type: 'date',
        prompt: 'questions.firstIphone',
        correctAnswer: '2007-06-29',
        component: DateInput,
        validationSchema: yup.date().required('validation.validDate'),
    },
    {
        type: 'numeric',
        prompt: 'questions.elementsPeriodicTable',
        correctAnswer: 118,
        component: NumberInput,
        validationSchema: yup.number().required('validation.required'),
    },
];