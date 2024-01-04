<script setup lang="ts">
import { CompletedRecord, Tag, Todo } from '@todo-mono/shared';
import { ref } from 'vue';
import { addDays } from 'date-fns';
import { todoStore, tagStore } from '../../utils/store';
import NumericInput from '../common/NumericInput.vue';
import RoundedContainer from '../common/RoundedContainer.vue';
import StyledButton from '../common/StyledButton.vue';

const INITIAL_VALUE = {
  title: '',
  importance: 1,
  done: false,
  repeatInterval: 0,
  dueDatePlus: 0,
};

const newTodoProps = ref({
  ...INITIAL_VALUE,
  completed: [] as CompletedRecord[],
  tags: [] as Tag[],
});

const addTodo = () => {
  const newTodo = new Todo({
    ...newTodoProps.value,
    dueDate: addDays(new Date(), newTodoProps.value.dueDatePlus),
  });
  todoStore.add(newTodo);
  newTodoProps.value = {
    ...INITIAL_VALUE,
    completed: [] as CompletedRecord[],
    tags: [] as Tag[],
  };
};

const addTag = (e: Event) => {
  const { target } = e;
  if (!(target instanceof HTMLSelectElement)) return;

  const targetTag = tagStore.tags.value.find((t) => t.name === target.value);
  if (!targetTag) return;

  const tagAlreadyExists = newTodoProps.value.tags.some((tag) => tag.name === targetTag.name);
  if (tagAlreadyExists) return;

  newTodoProps.value.tags.push(targetTag);
};
</script>

<template>
  <div class="flex flex-col rounded-3xl bg-slate-400 py-8">
    <div class="bg-slate-400 flex-grow flex justify-center space-x-4 place-items-center py-4">
      <span>할 일 제목</span>
      <textarea
        v-model="newTodoProps.title"
        class="w-80 h-10 p-2"
      />
    </div>

    <div class="flex">
      <div class="bg-slate-400 flex-grow flex justify-center space-x-4 place-items-center py-4">
        <span>중요도</span>
        <NumericInput
          v-model="newTodoProps.importance"
          class="bg-slate-300 w-12 text-end"
          :min="1"
          :max="5"
        />
      </div>
      <div class="bg-slate-400 flex-grow flex justify-center space-x-4 place-items-center py-4">
        <span>반복 주기</span>
        <NumericInput
          v-model="newTodoProps.repeatInterval"
          class="bg-slate-300 w-12 text-end"
          :min="0"
          :max="31"
        />
      </div>
      <div class="bg-slate-400 flex-grow flex justify-center space-x-4 place-items-center py-4">
        <span>마감까지 남은 일수</span>
        <NumericInput
          v-model="newTodoProps.dueDatePlus"
          class="bg-slate-300 w-12 text-end"
          :min="0"
          :max="31"
        />
      </div>
    </div>

    <div class="flex">
      <div class="bg-slate-400 flex-grow flex justify-center space-x-4 place-items-center py-4">
        <span>태그 추가</span>
        <select
          :value="newTodoProps.tags.map((e) => e.name)"
          @input="addTag"
        >
          <option
            v-for="tag in tagStore.tags.value"
            :key="tag.name"
            :value="tag.name"
            :label="tag.name"
            :style="{'background-color' : tag.color}"
          />
        </select>
      </div>
      <div class="bg-slate-400 flex-grow flex justify-center space-x-4 place-items-center py-4">
        <span>현재 태그</span>
        <RoundedContainer
          v-for="tag in newTodoProps.tags"
          :key="tag.name"
          :background="tag.color"
        >
          {{ tag.name }}
        </RoundedContainer>
      </div>
    </div>

    <StyledButton
      class="w-72 justify-self-center place-self-center mt-4"
      @click="addTodo"
    >
      추가하기
    </StyledButton>
  </div>
</template>
