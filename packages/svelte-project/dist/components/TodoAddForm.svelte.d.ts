import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: Record<string, never>;
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type TodoAddFormProps = typeof __propDef.props;
export type TodoAddFormEvents = typeof __propDef.events;
export type TodoAddFormSlots = typeof __propDef.slots;
export default class TodoAddForm extends SvelteComponent<TodoAddFormProps, TodoAddFormEvents, TodoAddFormSlots> {
}
export {};
