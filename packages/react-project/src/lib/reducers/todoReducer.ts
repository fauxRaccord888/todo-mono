import {
  Todo, getLocalTodoItems, setLocalTodoItems,
} from '@todo-mono/shared';
import type { TodoAction } from '../types/Reducer';

export function todoReducer(state: Todo[], action: TodoAction) {
  switch (action.type) {
    case 'loadLocal': {
      const items = getLocalTodoItems();
      return [...items];
    }
    case 'addItem': {
      const { item } = action.payload;

      const items = [...state, item];
      setLocalTodoItems(items);
      return items;
    }
    case 'addCompleted': {
      const { todo, memo } = action.payload;
      const items = state.map((t) => new Todo(structuredClone(t))); // 얕은 복제 시, completed 배열의 주소가 복제

      const target = items.find((t) => t.title === todo.title); // FIXME 고유키를 추가해야 함(렌더링 시도 필요)
      if (!target) return items;

      target.addComplete(memo);
      setLocalTodoItems(items);
      return items;
    }
    default: throw Error('Unknown action');
  }
}

export default todoReducer;
