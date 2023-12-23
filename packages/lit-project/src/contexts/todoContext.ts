import { ContextProvider, createContext } from '@lit/context';
import { Todo, getLocalTodoItems, setLocalTodoItems } from '@todo-mono/shared';

export const todoContext = createContext<Todo[]>(Symbol('todos'));

type TodoContext = typeof todoContext;
class TodoContextProvider extends ContextProvider<TodoContext> {
  loadLocal() {
    const localTodos = getLocalTodoItems();
    this.setValue([...localTodos]);
  }

  saveLocal() {
    setLocalTodoItems(this.value);
  }

  addTodo(todo: Todo) {
    this.setValue([...this.value, todo]);
    this.saveLocal();
  }

  addCompleted(todo: Todo, memo: string) {
    todo.addComplete(memo);
    this.saveLocal();
  }
}

export const todoContextProvider = new TodoContextProvider(
  document.body,
  { context: todoContext },
);
