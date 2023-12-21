import { Slot, component$ } from '@builder.io/qwik';

interface RoundedContainerProps {
  class?: string
  style?: Record<string, string>
}

export default component$((props: RoundedContainerProps) => (
  <span
    style={props.style}
    class={`${props.class} p-2 rounded-xl`}
  >
    <Slot />
  </span>
));
