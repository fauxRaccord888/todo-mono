<script setup lang="ts">
interface NumericInputProps {
  modelValue: number;
  min: number;
  max: number
}

const props = defineProps<NumericInputProps>();
const emit = defineEmits(['update:modelValue']);

// FIXME type assertion
// 공식 문서에서도 event.target에 접근할 때, type assertion을 쓰고 있음
// https://vuejs.org/guide/typescript/composition-api#typing-event-handlers
const handleChange = (e: Event /* & { target : HTMLInputElement} */) => {
  emit('update:modelValue', (e.target as HTMLInputElement).value);
};
</script>

<template>
  <input
    type="number"
    :min="props.min"
    :max="props.max"
    :value="props.modelValue"
    @change="handleChange"
  >
</template>
