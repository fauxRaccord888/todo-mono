import ESSerializer from 'esserializer';
import { CompletedRecord, Todo, Tag } from '../Class';

export const LOCAL_TODO_KEY = 'todo-mono-todos';
export const LOCAL_TAG_KEY = 'todo-mono-tags';

function typeAssertArray<T>(parsedItems: any, constructor: Function): T[] {
  if (!Array.isArray(parsedItems)) return [];
  const isCorrectType = parsedItems.every((item: any) => item instanceof constructor);
  if (!isCorrectType) return [];
  return parsedItems as T[];
}

class LocalStorageStore {
  todoItems: Todo[];
  tagItems: Tag[];

  constructor() {
    this.todoItems = this.getLocalTodoItems();
    this.tagItems = this.getLocalTagItems();
  }

  getLocalTodoItems() {
    const items = window.localStorage.getItem(LOCAL_TODO_KEY);
    if (!items) return [];
    const parsedItems = ESSerializer.deserialize(items, [Todo, CompletedRecord, Tag]);
    const res = typeAssertArray<Todo>(parsedItems, Todo);
    this.todoItems = res;
    return this.todoItems;
  }

  setLocalTodoItems(todos: Todo[]) {
    const stringifiedTodos = ESSerializer.serialize(todos);
    window.localStorage.setItem(LOCAL_TODO_KEY, stringifiedTodos);
    this.getLocalTodoItems();

    window.dispatchEvent(new StorageEvent(LOCAL_TODO_KEY));
  }

  getLocalTagItems() {
    const items = window.localStorage.getItem(LOCAL_TAG_KEY);
    if (!items) return [];
    const parsedItems = ESSerializer.deserialize(items, [Tag]);
    const res = typeAssertArray<Tag>(parsedItems, Tag);
    this.tagItems = res;
    return this.tagItems;
  }

  setLocalTagItems(tags: Tag[]) {
    const stringifiedTodos = ESSerializer.serialize(tags);
    window.localStorage.setItem(LOCAL_TAG_KEY, stringifiedTodos);
    this.getLocalTagItems();

    window.dispatchEvent(new StorageEvent(LOCAL_TAG_KEY));
  }
}

export const localStorageStore = new LocalStorageStore();

export default { localStorageStore };
