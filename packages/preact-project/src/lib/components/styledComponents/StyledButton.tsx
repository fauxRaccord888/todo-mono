import { PropsWithOptionalClassStyle } from '../../types/Prop';

function StyledButton(props: PropsWithOptionalClassStyle<{ onClick: () => void }>) {
  const { className, children, ...restProps } = props;
  return (
    <button
      {...restProps}
      type="button"
      className={`${className ?? ''} bg-gray-400 p-1 border-slate-800 border-2 border-solid rounded-2xl`}
    >
      {children}
    </button>
  );
}

export default StyledButton;
