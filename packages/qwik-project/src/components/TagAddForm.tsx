import {
  $, component$, useContext, useSignal,
} from '@builder.io/qwik';
import { tagsContext } from '../context/TagsContext';
import StyledButton from './styledComponents/StyledButton';

export default component$(() => {
  const tagsStore = useContext(tagsContext);
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

  const newTag = useSignal({ ...INITIAL_VALUE });

  const handleAddTag$ = $(() => {
    tagsStore.addItem$({ ...newTag.value });
    newTag.value = { ...INITIAL_VALUE };
  });

  return (
    <div class="flex flex-col rounded-3xl bg-slate-400 py-8">
      <div class="bg-slate-400 flex-grow flex justify-center space-x-4 place-items-center py-4">
        <span>태그 제목</span>
        <textarea
          value={newTag.value.name}
          // eslint-disable-next-line no-return-assign
          onInput$={(_ev, el) => newTag.value.name = el.value}
          class="w-80 h-10 p-2"
        />
      </div>

      <div class="flex">
        <div class="bg-slate-400 flex-grow flex justify-center space-x-4 place-items-center py-4">
          <span>태그 색상</span>
          <select
            preventdefault:change
            // eslint-disable-next-line no-return-assign
            onChange$={(_ev, el) => newTag.value.color = el.value}
          >
            {COLORS.map(
              (color, idx) => (
                <option
                  // eslint-disable-next-line react/no-array-index-key
                  key={idx}
                  label={color.label}
                  value={color.value}
                  // TODO 공식 문서에서는 inline-style를 권장하지 않음
                  style={{ 'background-color': color.value }}
                >
                  {color.label}
                </option>
              ),
            )}
          </select>
        </div>

        <div class="bg-slate-400 flex-grow flex justify-center space-x-4 place-items-center py-4">
          <StyledButton
            label="태그 추가하기"
            class="w-72 justify-self-center place-self-center mt-4"
            onClick$={handleAddTag$}
          >
            추가하기
          </StyledButton>
        </div>
      </div>
    </div>
  );
});
