import { For, Show, createSignal } from 'solid-js';
import { dueDateFormatter, yyyymmdd } from '@todo-mono/shared';
import { DeserializedTodo } from '../types/todoType';
import todoStore from '../stores/TodoStore';
import RoundedContainer from './styledComponents/RoundedContainer';
import StyledButton from './styledComponents/StyledButton';

export default function SingleTodo(props: { todo: DeserializedTodo }) {
  const { addComplete } = todoStore;
  const [isCompletedOpen, setIsCompletedOpen] = createSignal(false);
  const onComplete = (todo: DeserializedTodo) => {
    // eslint-disable-next-line no-alert
    const memo = window.prompt('완료를 축하합니다. 메모를 남겨주세요');
    addComplete(todo, memo || ' ');
  };

  return (
    <div class="flex-col space-y-4 border-2 border-slate-800 p-4 rounded-lg">
      <div class="flex items-center space-x-2">
        <span>
          { dueDateFormatter(props.todo.dueDate) }
        </span>
      </div>

      <div class="flex items-center p-2 border-slate-800 border-2 rounded-lg justify-between">
        <span>
          { props.todo.title }
        </span>
        <StyledButton onClick={[onComplete, props.todo]}>
          완료처리
        </StyledButton>
      </div>

      <div class="flex space-x-1">
        <RoundedContainer class="bg-amber-400">
          중요도:
          { props.todo.importance }
        </RoundedContainer>
        <RoundedContainer class="bg-orange-400">
          반복 주기:
          { props.todo.repeatInterval }
          일
        </RoundedContainer>
        <For each={props.todo.tags}>
          {(tag) => (
            <RoundedContainer
              style={{ background: tag.color }}
            >
              { tag.name }
            </RoundedContainer>
          )}
        </For>
      </div>

      <StyledButton
        class="w-full"
        onClick={() => setIsCompletedOpen(!isCompletedOpen())}
      >
        { isCompletedOpen() ? '완료 내역 닫기' : '완료 내역 보기' }
      </StyledButton>

      <Show when={isCompletedOpen()}>
        <div
          class="flex flex-col bg-gray-200 rounded-lg"
        >
          <For each={props.todo.completed}>
            {(record) => (
              <span
                class="flex justify-between items-center p-2"
              >
                { record.memo }
                <RoundedContainer class="bg-slate-400">
                  { yyyymmdd(record.completed) }
                </RoundedContainer>
              </span>
            )}
          </For>
        </div>
      </Show>
    </div>
  );
}
