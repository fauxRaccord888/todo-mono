import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: Record<string, never>;
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type TagAddFormProps = typeof __propDef.props;
export type TagAddFormEvents = typeof __propDef.events;
export type TagAddFormSlots = typeof __propDef.slots;
export default class TagAddForm extends SvelteComponent<TagAddFormProps, TagAddFormEvents, TagAddFormSlots> {
}
export {};
