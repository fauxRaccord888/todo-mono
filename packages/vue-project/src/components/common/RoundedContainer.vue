<script setup lang="ts">
interface RoundedContainerProps {
  background?: string
}

const props = defineProps<RoundedContainerProps>();
</script>

<template>
  <span
    :style="{'background-color': props.background}"
    class="p-2 rounded-xl"
  >
    <slot />
  </span>
</template>
