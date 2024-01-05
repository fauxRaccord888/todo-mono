import {
  component$, useStore, $, useContext,
} from '@builder.io/qwik';
/* UTILS */
import { addDays } from 'date-fns';
/* HOOKS */
import { todosContext } from '../context/TodosContext';
import { tagsContext } from '../context/TagsContext';
/* TYPES */
import { DeserializedCompleted, DeserializedTag } from '../types/todoType';
/* COMPONENTS */
import RoundedContainer from './styledComponents/RoundedContainer';
import StyledButton from './styledComponents/StyledButton';

export default component$(() => {
  const todosStore = useContext(todosContext);
  const tagsStore = useContext(tagsContext);

  const INITIAL_VALUE = {
    title: '',
    importance: 1,
    done: false,
    repeatInterval: 0,
    dueDatePlus: 0,
    tags: new Array<DeserializedTag>(),
    completed: new Array<DeserializedCompleted>(),
  };

  const newTodo = useStore<{ item: typeof INITIAL_VALUE }>({
    item: {
      ...INITIAL_VALUE,
      tags: new Array<DeserializedTag>(),
      completed: new Array<DeserializedCompleted>(),
    },
  });

  const handleClickAddTodo$ = $(() => {
    todosStore.addItem$({
      ...newTodo.item,
      dueDate: addDays(new Date(), newTodo.item.dueDatePlus),
    });
    newTodo.item = {
      ...INITIAL_VALUE,
      tags: new Array<DeserializedTag>(),
      completed: new Array<DeserializedCompleted>(),
    };
  });

  const handleSelectTag$ = $((_ev: Event, el: HTMLSelectElement) => {
    const tag = tagsStore.items.find((t) => t.name === el.value);
    if (!tag) return;
    newTodo.item = ({ ...newTodo.item, tags: [...newTodo.item.tags, tag] });
  });

  return (
    <div class="flex flex-col rounded-3xl bg-slate-400 py-8">
      <div class="bg-slate-400 flex-grow flex justify-center space-x-4 place-items-center py-4">
        <span>할 일 제목</span>
        <textarea
          value={newTodo.item.title}
          class="w-80 h-10 p-2"
          onInput$={(_ev, el) => { newTodo.item.title = el.value; }}
        />
      </div>

      <div class="flex">
        <div class="bg-slate-400 flex-grow flex justify-center space-x-4 place-items-center py-4">
          <span>중요도</span>
          <input
            type="number"
            class="bg-slate-300 w-12 text-end"
            min={1}
            max={5}
            value={newTodo.item.importance}
            onInput$={(_ev, el) => { newTodo.item.importance = Number(el.value); }}
          />
        </div>
        <div class="bg-slate-400 flex-grow flex justify-center space-x-4 place-items-center py-4">
          <span>반복 주기</span>
          <input
            type="number"
            class="bg-slate-300 w-12 text-end"
            min={0}
            max={31}
            value={newTodo.item.repeatInterval}
            onInput$={(_ev, el) => { newTodo.item.repeatInterval = Number(el.value); }}
          />
        </div>
        <div class="bg-slate-400 flex-grow flex justify-center space-x-4 place-items-center py-4">
          <span>마감까지 남은 일수</span>
          <input
            type="number"
            class="bg-slate-300 w-12 text-end"
            min={0}
            max={31}
            value={newTodo.item.dueDatePlus}
            onInput$={(_ev, el) => { newTodo.item.dueDatePlus = Number(el.value); }}
          />
        </div>
      </div>

      <div class="flex">
        <div class="bg-slate-400 flex-grow flex justify-center space-x-4 place-items-center py-4">
          <span>태그 추가</span>
          <select
            onChange$={handleSelectTag$}
          >
            {tagsStore.items.map((tag, i) => (
              <option
                // eslint-disable-next-line react/no-array-index-key
                key={i}
                class={`bg-[${tag.color}]`}
                value={tag.name}
                label={tag.name}
                // TODO 공식 문서에서는 inline-style를 권장하지 않음
                style={{ 'background-color': tag.color }}
              />
            ))}
          </select>
        </div>
        <div class="bg-slate-400 flex-grow flex justify-center space-x-4 place-items-center py-4">
          <span>현재 태그</span>
          {newTodo.item.tags.map(
            (tag, i) => (
              <RoundedContainer
              // eslint-disable-next-line react/no-array-index-key
                key={i}
                // TODO 공식 문서에서는 inline-style를 권장하지 않음
                style={{ 'background-color': tag.color }}
              >
                {tag.name}
              </RoundedContainer>
            ),
          )}

        </div>
      </div>

      <StyledButton
        label="할 일 추가하기 버튼"
        class="w-72 justify-self-center place-self-center mt-4"
        onClick$={handleClickAddTodo$}
      >
        추가하기
      </StyledButton>
    </div>
  );
});
