import { setLocalTodoItems, getLocalTodoItems } from '@todo-mono/shared';
import { createRoot } from 'solid-js';
import { createStore, produce } from 'solid-js/store';
import { addDays } from 'date-fns';
import { deserializeTodo, serializeTodo } from '../utils/serializer';
import { DeserializedTodo } from '../types/todoType';

function createTodos() {
  const [todos, setTodos] = createStore<DeserializedTodo[]>([]);
  const loadLocal = () => {
    const localTodo = getLocalTodoItems();
    const deserializedTodo = deserializeTodo(localTodo);
    setTodos([...deserializedTodo]);
  };

  const saveLocal = () => {
    const serializedTodo = serializeTodo(todos);
    setLocalTodoItems(serializedTodo);
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
    setTodos(idx, produce(
      (d) => {
        d.completed.push({
          id: d.completed.length + 1,
          completed: new Date(),
          memo,
        });
        // DEBUG side-effect 주의
        // eslint-disable-next-line no-param-reassign
        d.dueDate = addDays(new Date(), d.repeatInterval);
        return d;
      },
    ));
    saveLocal();
  };

  return {
    todos, loadLocal, addTodo, deleteTodo, addComplete,
  };
}

export default createRoot(createTodos);
