import { QRL, Slot, component$ } from '@builder.io/qwik';

interface StyledButtonProps {
  label: string
  class?: string
  onClick$: QRL<() => void>
}

export default component$((props: StyledButtonProps) => (
  <button
    aria-label={props.label}
    class={`${props.class} bg-gray-400 p-1 border-slate-800 border-2 border-solid rounded-2xl`}
    onClick$={props.onClick$}
  >
    <Slot />
  </button>
));
