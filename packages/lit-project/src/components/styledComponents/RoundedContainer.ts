/* eslint-disable import/extensions */
import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { TailwindElement } from '../../TailwindComponent/tailwind.element';

@customElement('rounded-container')
export class RoundedContainer extends TailwindElement {
  @property()
    class?: string = '';

  @property()
    color?: string = '';

  static styles = [
    ...TailwindElement.styles,
    css`
      span {
        background-color: var(--background);
      }
    `,
  ];

  render() {
    return html`
      <span>
        <slot></slot>
      </span>
  `;
  }
}

export default RoundedContainer;
