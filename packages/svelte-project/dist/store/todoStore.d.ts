/// <reference types="svelte" />
import { Todo } from '@todo-mono/shared';
export declare const todoStore: {
    subscribe: (this: void, run: import("svelte/store").Subscriber<Todo[]>, invalidate?: import("svelte/store").Invalidator<Todo[]> | undefined) => import("svelte/store").Unsubscriber;
    subscribeLocal: () => void;
    unsubscribeLocal: () => void;
    addTodo: (todo: Todo) => void;
    addCompleted: (todo: Todo, memo: string) => void;
};
export default todoStore;
