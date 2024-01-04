import { LOCAL_TODO_KEY, localStorageStore } from '@todo-mono/shared';
import { createRoot } from 'solid-js';
import { createStore, produce } from 'solid-js/store';
import { addDays } from 'date-fns';
import { deserializeTodo, serializeTodo } from '../utils/serializer';
import { DeserializedTodo } from '../types/todoType';

function createTodos() {
  const [todos, setTodos] = createStore<DeserializedTodo[]>([]);

  const loadLocal = () => {
    const localTodo = localStorageStore.getLocalTodoItems();
    const deserializedTodo = deserializeTodo(localTodo);
    setTodos([...deserializedTodo]);
  };

  const saveLocal = () => {
    const serializedTodo = serializeTodo(todos);
    localStorageStore.setLocalTodoItems(serializedTodo);
  };

  const subscribe = () => {
    loadLocal();
    window.addEventListener(LOCAL_TODO_KEY, loadLocal);
  };

  const unsubscribe = () => {
    window.removeEventListener(LOCAL_TODO_KEY, loadLocal);
  };

  const addTodo = (todo:DeserializedTodo) => {
    setTodos([...todos, todo]);
    saveLocal();
  };

  const deleteTodo = (todo: DeserializedTodo) => {
    setTodos([...todos.filter((t) => t.title !== todo.title)]);
    saveLocal();
  };

  const addComplete = (todo:DeserializedTodo, memo: string) => {
    const idx = todos.indexOf(todo);
    // Solid의 produce local mutation을 허용하는 api임
    // "Immer에서 영감을 받은 API로, Solid 스토어 객체에 대한 로컬라이즈된 변경을 허용합니다."
    setTodos(idx, produce(
      (d) => {
        d.completed.push({
          id: d.completed.length + 1,
          completed: new Date(),
          memo,
        });
        // eslint-disable-next-line no-param-reassign
        d.dueDate = addDays(new Date(), d.repeatInterval);
        return d;
      },
    ));
    saveLocal();
  };

  return {
    todos, subscribe, unsubscribe, addTodo, deleteTodo, addComplete,
  };
}

export default createRoot(createTodos);
