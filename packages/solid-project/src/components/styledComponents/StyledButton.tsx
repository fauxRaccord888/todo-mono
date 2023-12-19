import { ComponentProps } from 'solid-js';

export default function StyledButton(props: ComponentProps<'button'>) {
  return (
    <button
      {...props}
      class={`${props.class} bg-gray-400 p-1 border-slate-800 border-2 border-solid rounded-2xl`}
    >
      {props.children}
    </button>
  );
}
