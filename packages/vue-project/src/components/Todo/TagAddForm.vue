<script setup lang="ts">
import { ref } from 'vue';
import { Tag } from '@todo-mono/shared';
import { tagStore } from '../../utils/store';
import StyledButton from '../common/StyledButton.vue';

const INITIAL_VALUE = {
  name: '',
  color: '#17A589',
};
const COLORS = [
  { label: '청록', value: '#17A589' },
  { label: '민트', value: '#82E0AA' },
  { label: '노랑', value: '#F4D03F' },
  { label: '진홍', value: '#CD6155' },
  { label: '보라', value: '#AF7AC5' },
  { label: '하늘', value: '#AED6F1' },
  { label: '오렌지', value: '#E59866' },
];

const newTagProps = ref({ ...INITIAL_VALUE });

const addTag = () => {
  const newTag = new Tag({
    ...newTagProps.value,
  });
  const result = tagStore.add(newTag);
  newTagProps.value = { ...INITIAL_VALUE };
  // eslint-disable-next-line no-alert
  if (!result) window.alert('태그 생성에 실패했어요.');
};

</script>

<template>
  <div class="flex flex-col rounded-3xl bg-slate-400 py-8">
    <div class="bg-slate-400 flex-grow flex justify-center space-x-4 place-items-center py-4">
      <span>태그 제목</span>
      <textarea
        v-model="newTagProps.name"
        class="w-80 h-10 p-2"
      />
    </div>

    <div class="flex">
      <div class="bg-slate-400 flex-grow flex justify-center space-x-4 place-items-center py-4">
        <span>태그 색상</span>
        <select
          v-model="newTagProps.color"
          :style="{'background-color':newTagProps.color}"
        >
          <option
            v-for="color in COLORS"
            :key="color.value"
            :label="color.label"
            :value="color.value"
            :style="{'background-color':color.value}"
          />
        </select>
      </div>
      <div class="bg-slate-400 flex-grow flex justify-center space-x-4 place-items-center py-4">
        <StyledButton
          class="w-72 justify-self-center place-self-center mt-4"
          @click="addTag"
        >
          추가하기
        </StyledButton>
      </div>
    </div>
  </div>
</template>
