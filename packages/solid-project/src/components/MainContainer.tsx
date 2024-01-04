import { For, onMount } from 'solid-js';

import todoStore from '../stores/TodoStore';
import tagStore from '../stores/TagStore';

import SingleTodo from './SingleTodo';
import StyledTitle from './styledComponents/StyledTitle';
import TagAddForm from './TagAddForm';
import TodoAddForm from './TodoAddForm';
import ViteIcon from './Icons/ViteIcon';
import SolidIcon from './Icons/SolidIcon';

export default function MainContainer() {
  onMount(() => {
    todoStore.subscribe();
    tagStore.subscribe();
    return (() => {
      todoStore.unsubscribe();
      tagStore.unsubscribe();
    });
  });

  return (
    <div class="flex flex-col place-items-center space-y-12 wanted-sans">
      <div class="space-y-4 w-full">
        <StyledTitle>
          <div class="flex items-center justify-center">
            Solid
            <SolidIcon class="w-16 h-16" />
            +
            Vite
            <ViteIcon class="w-16 h-16" />
          </div>
        </StyledTitle>
      </div>

      <div class="space-y-4 w-full">
        <StyledTitle>📝 할 일 추가하기</StyledTitle>
        <TodoAddForm />
      </div>

      <div class="space-y-4 w-full">
        <StyledTitle>#️⃣ 태그 추가하기</StyledTitle>
        <TagAddForm />
      </div>

      <div class="space-y-4 w-full">
        <StyledTitle>⛳ 할 일 목록</StyledTitle>
        <For each={todoStore.todos}>
          {(todo) => (
            <SingleTodo todo={todo} />
          )}
        </For>
      </div>

    </div>
  );
}
