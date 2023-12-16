<script setup lang="ts">
import { onMounted } from 'vue';
import MainContainer from './components/Todo/MainContainer.vue';
import { todoStore, tagStore } from './utils/store';

onMounted(() => {
  todoStore.loadLocal();
  tagStore.loadLocal();
});

</script>

<template>
  <MainContainer class="wanted-sans" />
</template>
