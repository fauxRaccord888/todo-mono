import { PropsWithOptionalClassStyle } from "../../types/Prop";

function StyledButton(props: PropsWithOptionalClassStyle<{onClick: () => void}>) {
  return (
    <button
      {...props}
      className={`${props.className ?? ''} bg-gray-400 p-1 border-slate-800 border-2 border-solid rounded-2xl`}
    >
      {props.children}
    </button>
  );
}

export default StyledButton