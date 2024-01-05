import { Todo, localStorageStore, LOCAL_TODO_KEY } from '@todo-mono/shared';
import { useState } from 'preact/hooks';
import { type TodoAction } from '../types/Hooks';

type Dispatcher = (action: TodoAction) => void;

export default function useTodoStore(): [Todo[], Dispatcher] {
  const [todos, setTodos] = useState<Todo[]>([]);

  function loadLocal() {
    const items = localStorageStore.getLocalTodoItems();
    setTodos(items);
  }

  const dispatcher: Dispatcher = (action) => {
    switch (action.type) {
      case 'subscribe': {
        loadLocal();
        window.addEventListener(LOCAL_TODO_KEY, loadLocal);
        break;
      }
      case 'unsubscribe': {
        window.removeEventListener(LOCAL_TODO_KEY, loadLocal);
        break;
      }
      case 'addItem': {
        const { item } = action.payload;

        const items = [...todos, item];
        localStorageStore.setLocalTodoItems(items);
        break;
      }
      case 'addCompleted': {
        const { todo, memo } = action.payload;
        const clonedTodos = todos.map((t) => new Todo(structuredClone(t)));
        const target = clonedTodos.find((t) => t.title === todo.title);
        if (!target) break;

        target.addComplete(memo);
        localStorageStore.setLocalTodoItems(clonedTodos);
        break;
      }
      default: throw Error('Unknown action');
    }
  };

  return [todos, dispatcher];
}
