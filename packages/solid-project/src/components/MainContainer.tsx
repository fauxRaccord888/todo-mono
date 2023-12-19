import { For } from 'solid-js';
import todoStore from '../stores/TodoStore';
import SingleTodo from './SingleTodo';
import TodoAddForm from './TodoAddForm';
import TagAddForm from './TagAddForm'
import StyledTitle from './styledComponents/StyledTitle';

export default function MainContainer() {
  const { todos } = todoStore;

  return (
    <div class="flex flex-col w-full place-items-center space-y-12 py-12 wanted-sans">
      <div class="w-[48rem] space-y-4">
        <StyledTitle>📝 할 일 추가하기</StyledTitle>
        <TodoAddForm />
      </div>

      <div class="w-[48rem] space-y-4">
        <StyledTitle>#️⃣ 태그 추가하기</StyledTitle>
        <TagAddForm />
      </div>

      <div class="w-[48rem] space-y-4">
        <StyledTitle>⛳ 할 일 목록</StyledTitle>
        <For each={todos}>
          {(todo) => (
            <>
              <SingleTodo todo={todo} />
            </>
          )}
        </For>
      </div>

    </div>
  );
}
