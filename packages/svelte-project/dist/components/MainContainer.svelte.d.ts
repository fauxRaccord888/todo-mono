import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: Record<string, never>;
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type MainContainerProps = typeof __propDef.props;
export type MainContainerEvents = typeof __propDef.events;
export type MainContainerSlots = typeof __propDef.slots;
export default class MainContainer extends SvelteComponent<MainContainerProps, MainContainerEvents, MainContainerSlots> {
}
export {};
