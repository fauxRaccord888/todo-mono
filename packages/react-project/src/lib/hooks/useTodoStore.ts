import { Todo, localStorageStore, LOCAL_TODO_KEY } from '@todo-mono/shared';
import { useSyncExternalStore } from 'react';
import type { TodoAction } from '../types/Reducer';

function getSnapShot() {
  return localStorageStore.todoItems;
}

function subscribe(callback: () => void) {
  window.addEventListener(LOCAL_TODO_KEY, callback);
  return () => {
    window.removeEventListener(LOCAL_TODO_KEY, callback);
  };
}

type PseudoDispatcher = (action: TodoAction) => void;

// dispatcher가 순수 함수가 아님을 주의
// localStorage라는 외부에 직접 개입함(자신의 내부적 state에만 관여하지 않음)
const useTodoStore = (): [Todo[], PseudoDispatcher] => {
  const todos = useSyncExternalStore(subscribe, getSnapShot);

  const pseudoDispatcher = (action: TodoAction): void => {
    switch (action.type) {
      case 'addItem': {
        const { item } = action.payload;
        const items = [...todos, item];
        localStorageStore.setLocalTodoItems(items);
        break;
      }
      case 'addCompleted': {
        const { todo, memo } = action.payload;
        const items = todos.map((t) => new Todo(structuredClone(t)));

        const target = items.find((t) => t.title === todo.title); // FIXME 고유키를 추가해야 함(렌더링 시도 필요)
        if (!target) return;

        target.addComplete(memo);
        localStorageStore.setLocalTodoItems(items);
        break;
      }

      default: throw Error('Unknown action');
    }
  };

  return [todos, pseudoDispatcher];
};

export default useTodoStore;
