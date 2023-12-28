import { ComponentChildren } from "preact";
import { CSSProperties } from "preact/compat"; 
// FIXME compat 이외 preact의 cssProp이 있는지 확인 필요

export type PropsWithOptionalClassStyle<T = unknown> = T & {
  children: ComponentChildren
  className?: string
  style?: CSSProperties
};
