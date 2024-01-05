/// <reference types="svelte" />
import { Tag } from '@todo-mono/shared';
export declare const tagStore: {
    subscribe: (this: void, run: import("svelte/store").Subscriber<Tag[]>, invalidate?: import("svelte/store").Invalidator<Tag[]> | undefined) => import("svelte/store").Unsubscriber;
    subscribeLocal: () => void;
    unsubscribeLocal: () => void;
    addTag: (tag: Tag) => void;
};
export default tagStore;
