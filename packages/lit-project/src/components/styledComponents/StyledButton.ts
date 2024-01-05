/* eslint-disable import/extensions */
import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { TailwindElement } from '../../TailwindComponent/tailwind.element';

@customElement('styled-button')
export class StyledButton extends TailwindElement {
  @property()
    class?: string = '';

  render() {
    return html`
      <button class="bg-gray-400 p-1 border-slate-800 border-2 border-solid rounded-2xl ${this.class}">
        <slot></slot>
      </button>
  `;
  }
}

export default StyledButton;
