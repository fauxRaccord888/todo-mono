import { PropsWithOptionalClassStyle } from "../../types/Prop";

function RoundContainer(props: PropsWithOptionalClassStyle) {
  return (
    <span
      {...props}
      className={`${props.className ?? ''} p-2 rounded-xl`}
    >
      {props.children}
    </span>
  );
}

export default RoundContainer