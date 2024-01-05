import { Tag, Todo } from '@todo-mono/shared';

type DispatchActions<T> =
    | { type: 'subscribe' }
    | { type: 'unsubscribe' }
    | { type: 'addItem', payload: { item: T } };

export type TodoAction = DispatchActions<Todo>
| { type: 'addCompleted', payload: { todo: Todo, memo: string } };

export type TagAction = DispatchActions<Tag>;
