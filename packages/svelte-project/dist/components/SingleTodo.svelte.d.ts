import { SvelteComponent } from "svelte";
import { Todo } from "@todo-mono/shared";
declare const __propDef: {
    props: {
        todo: Todo;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type SingleTodoProps = typeof __propDef.props;
export type SingleTodoEvents = typeof __propDef.events;
export type SingleTodoSlots = typeof __propDef.slots;
export default class SingleTodo extends SvelteComponent<SingleTodoProps, SingleTodoEvents, SingleTodoSlots> {
}
export {};
