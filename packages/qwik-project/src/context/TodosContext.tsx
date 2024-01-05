/* eslint-disable func-names */

import {
  useStore, $, QRL, createContextId, component$, useContextProvider, Slot,
} from '@builder.io/qwik';

import { localStorageStore, LOCAL_TODO_KEY } from '@todo-mono/shared';
import { addDays } from 'date-fns';
import { deserializeTodo, serializeTodo } from '../utils/serializer';
import { DeserializedTodo } from '../types/todoType';

export interface CustomStore<T> {
  items: Array<T>;
  subscribeLocal$: QRL<() => void>;
  unsubscribeLocal$: QRL<() => void>;
  loadLocal$: QRL<() => void>;
  saveLocal$: QRL<() => void>;
  addItem$: QRL<(t: T) => void>;
}

export interface TodosStore extends CustomStore<DeserializedTodo> {
  addComplete$: QRL<(todo: DeserializedTodo, memo: string) => void>;
}

export const todosContext = createContextId<TodosStore>('Todos');
export default component$(() => {
  const todosStore = useStore<TodosStore>({
    items: [],
    loadLocal$: $(function (this: TodosStore) {
      const serializedTodos = localStorageStore.getLocalTodoItems();
      const deserialized = deserializeTodo(serializedTodos);
      this.items = [...deserialized];
    }),
    saveLocal$: $(function (this: TodosStore) {
      const serialized = serializeTodo(this.items);
      localStorageStore.setLocalTodoItems(serialized);
    }),
    subscribeLocal$: $(function (this: TodosStore) {
      this.loadLocal$();
      window.addEventListener(LOCAL_TODO_KEY, this.loadLocal$);
    }),
    unsubscribeLocal$: $(function (this: TodosStore) {
      window.removeEventListener(LOCAL_TODO_KEY, this.loadLocal$);
    }),
    addItem$: $(function (this: TodosStore, todo: DeserializedTodo) {
      this.items = [...this.items, todo];
      this.saveLocal$();
    }),
    addComplete$: $(function (this: TodosStore, todo: DeserializedTodo, memo: string) {
      const target = this.items.find((t) => t.title === todo.title);
      if (!target) return;
      target.completed.push({
        memo,
        id: target.completed.length + 1,
        completed: new Date(),
      });
      target.dueDate = addDays(new Date(), target.repeatInterval);
      this.saveLocal$();
    }),
  });

  useContextProvider(todosContext, todosStore);

  return (
    <Slot />
  );
});
