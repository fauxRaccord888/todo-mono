import {
  component$, useContext, useSignal, $,
} from '@builder.io/qwik';
/* UTILS */
import { dueDateFormatter, yyyymmdd } from '@todo-mono/shared';
/* HOOKS */
import { todosContext } from '../context/TodosContext';
/* TYPES */
import { DeserializedTodo } from '../types/todoType';
/* COMPONENTS */
import RoundedContainer from './styledComponents/RoundedContainer';
import StyledButton from './styledComponents/StyledButton';

export default component$((props: { todo: DeserializedTodo }) => {
  const todos = useContext(todosContext);
  const isCompletedOpen = useSignal(false);
  const onComplete$ = $(() => {
    // eslint-disable-next-line no-alert
    const memo = window.prompt('완료를 축하합니다. 메모를 남겨주세요');
    todos.addComplete$(props.todo, memo || ' ');
  });

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
        <StyledButton label="완료처리" onClick$={onComplete$}>
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
        {
          props.todo.tags.map((tag) => (
            <RoundedContainer
              key={tag.name}
              // TODO 공식 문서에서는 inline-style를 권장하지 않음
              style={{ 'background-color': tag.color }}
            >
              { tag.name }
            </RoundedContainer>
          ))
        }
      </div>

      <StyledButton
        class="w-full"
        label="완료 내역 토글"
        // eslint-disable-next-line no-return-assign
        onClick$={$(() => { isCompletedOpen.value = !isCompletedOpen.value; })}
      >
        { isCompletedOpen.value ? '완료 내역 닫기' : '완료 내역 보기' }
      </StyledButton>

      {isCompletedOpen.value && (
        <div
          class="flex flex-col bg-gray-200 rounded-lg"
        >
          {props.todo.completed.map(
            (record) => (
              <span
                class="flex justify-between items-center p-2"
                key={record.id}
              >
                { record.memo }
                <RoundedContainer class="bg-slate-400">
                  { yyyymmdd(record.completed) }
                </RoundedContainer>
              </span>
            ),
          )}
        </div>
      )}
    </div>
  );
});
