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
      <style>
        span {
          --background: ${this.color ?? ''}
        }
      </style>
      <span class="p-2 rounded-xl ${this.class}">
        <slot></slot>
      </span>
  `;
  }
}

export default RoundedContainer;
