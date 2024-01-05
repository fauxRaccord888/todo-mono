/** @typedef {typeof __propDef.props}  StyledButtonProps */
/** @typedef {typeof __propDef.events}  StyledButtonEvents */
/** @typedef {typeof __propDef.slots}  StyledButtonSlots */
export default class StyledButton extends SvelteComponent<{
    [x: string]: any;
}, {
    click: MouseEvent;
} & {
    [evt: string]: CustomEvent<any>;
}, {
    default: {};
}> {
}
export type StyledButtonProps = typeof __propDef.props;
export type StyledButtonEvents = typeof __propDef.events;
export type StyledButtonSlots = typeof __propDef.slots;
import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        [x: string]: any;
    };
    events: {
        click: MouseEvent;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export {};
