import type { CompletedRecord, Tag } from "@todo-mono/shared";

export const INITIAL_VALUE = {
    title: '',
    importance: 1,
    done: false,
    repeatInterval: 0,
    dueDatePlus: 0,
    tags: new Array<Tag>(),
    completed: new Array<CompletedRecord>()
};