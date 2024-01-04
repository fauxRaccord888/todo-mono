import { ComponentProps } from 'solid-js';

export default function RoundedContainer(props: ComponentProps<'span'>) {
  return (
    <span
      {...props}
      class={`${props.class} p-2 rounded-xl`}
    >
      {props.children}
    </span>
  );
}
