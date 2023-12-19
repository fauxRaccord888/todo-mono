import { createSignal, For } from 'solid-js';
import tagStore from '../stores/TagStore';
import StyledButton from './styledComponents/StyledButton';

export default function TagAddForm() {
  const { addTag } = tagStore;
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

  const [newTag, setNewTag] = createSignal({
    ...INITIAL_VALUE,
  });

  const handleNameInput = (e: Event & { target: HTMLTextAreaElement }) => {
    setNewTag({ ...newTag(), name: e.target.value });
  };

  const handleColorSelect = (e: Event & { target: HTMLSelectElement }) => {
    setNewTag({ ...newTag(), color: e.target.value });
  };

  const handleAddTag = () => {
    addTag(newTag());
    setNewTag({ ...INITIAL_VALUE });
  };

  return (
    <div class="flex flex-col rounded-3xl bg-slate-400 py-8">
      <div class="bg-slate-400 flex-grow flex justify-center space-x-4 place-items-center py-4">
        <span>태그 제목</span>
        <textarea
          onInput={handleNameInput}
          class="w-80 h-10 p-2"
        />
      </div>

      <div class="flex">
        <div class="bg-slate-400 flex-grow flex justify-center space-x-4 place-items-center py-4">
          <span>태그 색상</span>
          <select
            onChange={handleColorSelect}
          >
            <For each={COLORS}>
              {(color) => (
                <option
                  label={color.label}
                  value={color.value}
                  style={{ 'background-color': color.value }}
                >
                  {color.label}
                </option>
              )}
            </For>
          </select>
        </div>

        <div class="bg-slate-400 flex-grow flex justify-center space-x-4 place-items-center py-4">
          <StyledButton
            class="w-72 justify-self-center place-self-center mt-4"
            onClick={handleAddTag}
          >
            추가하기
          </StyledButton>
        </div>
      </div>
    </div>
  );
}
