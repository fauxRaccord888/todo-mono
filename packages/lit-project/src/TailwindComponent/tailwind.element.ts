import { LitElement, unsafeCSS } from 'lit';
import tailwindStyle from './tailwind.global.css?inline';

const tailwindElement = unsafeCSS(tailwindStyle);

export class TailwindElement extends LitElement {
  static styles = [tailwindElement];
}

export default { TailwindElement };
