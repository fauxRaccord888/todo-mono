<script setup lang="ts">
import { ref } from 'vue';
import { Todo, dueDateFormatter, yyyymmdd } from '@todo-mono/shared';
// eslint-disable-next-line import/no-extraneous-dependencies
import { todoStore } from '../../utils/store';
import RoundedContainer from '../common/RoundedContainer.vue';
import StyledButton from '../common/StyledButton.vue';

const props = defineProps<{ todo: Todo }>();
const isCompletedOpen = ref(false);

const onComplete = () => {
  // eslint-disable-next-line no-alert
  const memo = window.prompt('완료를 축하해요. 메모를 남겨주세요');
  todoStore.addComplete(props.todo, memo);
};
const onToggleCompleted = () => { isCompletedOpen.value = !isCompletedOpen.value; };
</script>

<template>
  <div class="flex-col space-y-4 border-2 border-slate-800 p-4 rounded-lg">
    <div class="flex items-center space-x-2">
      <span> {{ dueDateFormatter(props.todo.dueDate) }} </span>
    </div>

    <div class="flex items-center p-2 border-slate-800 border-2 rounded-lg justify-between">
      <span>
        {{ props.todo.title }}
      </span>
      <StyledButton @click="onComplete">
        완료처리
      </StyledButton>
    </div>

    <div class="flex space-x-1">
      <RoundedContainer class="bg-amber-400">
        중요도: {{ props.todo.importance }}
      </RoundedContainer>
      <RoundedContainer class="bg-orange-400">
        반복 주기: {{ props.todo.repeatInterval }}일
      </RoundedContainer>
      <RoundedContainer
        v-for="tag in props.todo.tags"
        :key="tag.name"
        :background="tag.color"
      >
        {{ tag.name }}
      </RoundedContainer>
    </div>

    <StyledButton
      class="w-full"
      @click="onToggleCompleted"
    >
      {{ isCompletedOpen ? '완료 내역 닫기' : '완료 내역 보기' }}
    </StyledButton>

    <div
      v-if="isCompletedOpen"
      class="flex flex-col bg-gray-200 rounded-lg"
    >
      <span
        v-for="record in props.todo.completed"
        :key="record.id"
        class="flex justify-between items-center p-2"
      >
        {{ record.memo }}
        <RoundedContainer class="bg-slate-400">
          {{ yyyymmdd(record.completed) }}
        </RoundedContainer>
      </span>
    </div>
  </div>
</template>
