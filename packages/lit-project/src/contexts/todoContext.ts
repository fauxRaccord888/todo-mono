import { ContextProvider, createContext } from '@lit/context';
import { Todo, localStorageStore, LOCAL_TODO_KEY } from '@todo-mono/shared';

export const todoContext = createContext<Todo[]>(Symbol('todos'));

type TodoContext = typeof todoContext;
class TodoContextProvider extends ContextProvider<TodoContext> {
  subscribe() {
    this.loadLocal();
    window.addEventListener(LOCAL_TODO_KEY, this.loadLocal.bind(this));
  }

  unsubscribe() {
    window.removeEventListener(LOCAL_TODO_KEY, this.loadLocal.bind(this));
  }

  loadLocal() {
    const localTodos = localStorageStore.getLocalTodoItems();
    this.setValue([...localTodos]);
  }

  saveLocal() {
    localStorageStore.setLocalTodoItems([...this.value]);
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
