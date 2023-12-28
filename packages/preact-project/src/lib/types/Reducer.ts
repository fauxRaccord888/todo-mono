import { Tag, Todo } from '@todo-mono/shared';

type DispatchActions<T> =
    | { type: 'loadLocal' }
    | { type: 'addItem', payload: { item: T } };

export type TodoAction = DispatchActions<Todo>
| { type: 'addCompleted', payload: { todo: Todo, memo: string } };

export type TagAction = DispatchActions<Tag>;
