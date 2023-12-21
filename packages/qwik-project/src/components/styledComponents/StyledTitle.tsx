import { Slot, component$ } from '@builder.io/qwik';

interface StyledTitleProps {
  class?: string
}

export default component$((props: StyledTitleProps) => (
  <h2 class={`${props.class} flex flex-col text-4xl text-center`}>
    <Slot />
  </h2>
));
