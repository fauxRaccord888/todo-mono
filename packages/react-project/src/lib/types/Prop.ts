import { PropsWithChildren } from 'react';

export type PropsWithOptionalClassStyle<T = unknown> = PropsWithChildren<T> & {
  className?: string
  style?: React.CSSProperties
};
