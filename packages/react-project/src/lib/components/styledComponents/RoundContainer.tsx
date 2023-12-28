import { PropsWithOptionalClassStyle } from '../../types/Prop';

function RoundContainer(props: PropsWithOptionalClassStyle) {
  const { className, children, ...restProps } = props;
  return (
    <span
      {...restProps}
      className={`${className ?? ''} p-2 rounded-xl`}
    >
      {children}
    </span>
  );
}

export default RoundContainer;
