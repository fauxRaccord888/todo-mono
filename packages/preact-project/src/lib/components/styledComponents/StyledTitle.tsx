import { PropsWithOptionalClassStyle } from '../../types/Prop';

function StyledTitle(props: PropsWithOptionalClassStyle) {
  const { className, children, ...restProps } = props;
  return (
    <h2
      {...restProps}
      className={`${className ?? ''} flex flex-col text-4xl text-center`}
    >
      {children}
    </h2>
  );
}

export default StyledTitle;
