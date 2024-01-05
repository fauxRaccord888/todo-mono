import { CSSProperties, PropsWithChildren } from "preact/compat"; 
// FIXME compat 이외 preact의 cssProp이 있는지 확인 필요

export type PropsWithOptionalClassStyle<T = unknown> = PropsWithChildren<T> & {
  className?: string
  style?: CSSProperties
};
