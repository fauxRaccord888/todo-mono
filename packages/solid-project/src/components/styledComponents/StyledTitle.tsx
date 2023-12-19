import { ComponentProps } from 'solid-js';

export default function StyledTitle(props: ComponentProps<'h2'>) {
  return (
    <h2
      {...props}
      class={`${props.class} flex flex-col text-4xl text-center`}
    >
      {props.children}
    </h2>
  );
}
