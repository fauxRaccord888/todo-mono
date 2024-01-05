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
      <button>
        <slot></slot>
      </button>
  `;
  }
}

export default StyledButton;
