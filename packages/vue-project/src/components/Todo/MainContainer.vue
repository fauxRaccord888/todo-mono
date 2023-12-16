<script setup lang="ts">
import SingleTodo from './SingeTodo.vue';
import TodoAddForm from './TodoAddForm.vue';
import TagAddForm from './TagAddForm.vue';

import { todoStore } from '../../utils/store';
import StyledTitle from '../common/StyledTitle.vue';
</script>

<template>
  <div class="flex flex-col w-full place-items-center space-y-12 py-12">
    <div class="main-item space-y-4">
      <StyledTitle>📝 할 일 추가하기</StyledTitle>
      <TodoAddForm />
    </div>
    <div class="main-item space-y-4">
      <StyledTitle>#️⃣ 태그 추가하기</StyledTitle>
      <TagAddForm />
    </div>

    <div class="main-item space-y-4">
      <StyledTitle>⛳ 할 일 목록</StyledTitle>
      <SingleTodo
        v-for="todo in todoStore.todos"
        :key="todo.title"
        :todo="todo"
      />
    </div>
  </div>
</template>

<style>
.main-item {
  width: 600px;
}
</style>
