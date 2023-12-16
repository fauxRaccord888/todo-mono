import ESSerializer from 'esserializer';
import { CompletedRecord, Todo, Tag } from '../Class';

const LOCAL_STORAGE_KEY = 'todo-mono-todos';
const LOCAL_TAG_KEY = 'todo-mono-tags';

function typeAssertArray<T>(parsedItems: any, constructor: Function): T[] {
  if (!Array.isArray(parsedItems)) return [];
  const isCorrectType = parsedItems.every((item: any) => item instanceof constructor);
  if (!isCorrectType) return [];
  return parsedItems as T[];
}

export const getLocalTodoItems = () => {
  const items = window.localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!items) return [];
  const parsedItems = ESSerializer.deserialize(items, [Todo, CompletedRecord, Tag]);
  const res = typeAssertArray<Todo>(parsedItems, Todo);
  return res;
};

export const setLocalTodoItems = (todos: Todo[]) => {
  const stringifiedTodos = ESSerializer.serialize(todos);
  window.localStorage.setItem(LOCAL_STORAGE_KEY, stringifiedTodos);
};

export const getLocalTagItems = () => {
  const items = window.localStorage.getItem(LOCAL_TAG_KEY);
  if (!items) return [];
  const parsedItems = ESSerializer.deserialize(items, [Tag]);
  const res = typeAssertArray<Tag>(parsedItems, Tag);
  return res;
};

export const setLocalTagItems = (tags: Tag[]) => {
  const stringifiedTodos = ESSerializer.serialize(tags);
  window.localStorage.setItem(LOCAL_TAG_KEY, stringifiedTodos);
};

export default { getLocalTodoItems };
