import { setLocalTodoItems, getLocalTodoItems} from '@todo-mono/shared';
import { createRoot } from 'solid-js';
import { createStore, produce } from 'solid-js/store';
import { deserializeTodo, serializeTodo } from '../utils/serializer';
import { addDays } from 'date-fns';

function createTodos() {
  const [todos, setTodos] = createStore([] as DeserializedTodo[]);
  const loadLocal = () => {
    const localTodo = getLocalTodoItems();
    const deserializedTodo = deserializeTodo(localTodo);
    console.log(deserializedTodo)
    setTodos([...deserializedTodo]);
  };

  const saveLocal = () => {
    const serializedTodo = serializeTodo(todos);
    console.log(serializedTodo)
    setLocalTodoItems(serializedTodo);
  };

  const addTodo = (todo:any) => {
    setTodos([...todos, todo]);
    saveLocal();
  };

  const deleteTodo = (todo: any) => {
    setTodos([...todos.filter((t) => t.title !== todo.title)]);
    saveLocal();
  };

  const addComplete = (todo:any, memo: string) => {
    const idx = todos.indexOf(todo);
    setTodos(idx, produce(
      (d) => {
        d.completed.push({
          id: d.completed.length + 1,
          completed: new Date(),
          memo: memo
       });
       d.dueDate = addDays(new Date(), d.repeatInterval)
       return d
      }
    ));
    saveLocal();
  };

  return {
    todos, loadLocal, addTodo, deleteTodo, addComplete,
  };
}

export default createRoot(createTodos);
