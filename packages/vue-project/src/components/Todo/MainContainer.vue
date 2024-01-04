<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { todoStore, tagStore } from '../../utils/store';

import SingleTodo from './SingeTodo.vue';
import TodoAddForm from './TodoAddForm.vue';
import TagAddForm from './TagAddForm.vue';

import VueIcon from '../Icons/VueIcon.vue';
import ViteIcon from '../Icons/ViteIcon.vue';
import StyledTitle from '../common/StyledTitle.vue';

onMounted(() => {
  todoStore.subscribe();
  tagStore.subscribe();
});
onUnmounted(() => {
  todoStore.unsubscribe();
  tagStore.unsubscribe();
});
</script>

<template>
  <div class="flex flex-col place-items-center space-y-12 wanted-sans">
    <div class="space-y-4 w-full">
      <StyledTitle>
        <div class="flex items-center justify-center">
          Vue
          <VueIcon class="w-16 h-16" />
          +
          Vite
          <ViteIcon class="w-16 h-16" />
        </div>
      </StyledTitle>
    </div>

    <div className="space-y-4 w-full">
      <StyledTitle>📝 할 일 추가하기</StyledTitle>
      <TodoAddForm />
    </div>
    <div className="space-y-4 w-full">
      <StyledTitle>#️⃣ 태그 추가하기</StyledTitle>
      <TagAddForm />
    </div>

    <div className="space-y-4 w-full">
      <StyledTitle>⛳ 할 일 목록</StyledTitle>
      <SingleTodo
        v-for="todo in todoStore.todos.value"
        :key="todo.title"
        :todo="todo"
      />
    </div>
  </div>
</template>
