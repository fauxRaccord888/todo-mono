<script setup lang="ts">
interface NumericInputProps {
  modelValue: number;
  min: number;
  max: number
}

const props = defineProps<NumericInputProps>();
defineEmits(['update:modelValue']);
</script>

<template>
  <input
    type="number"
    :min="props.min"
    :max="props.max"
    :value="props.modelValue"
    @change="$emit('update:modelValue', Number($event.target.value)) "
  >
</template>
