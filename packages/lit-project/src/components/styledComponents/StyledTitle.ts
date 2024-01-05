/* eslint-disable import/extensions */
import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { TailwindElement } from '../../TailwindComponent/tailwind.element';

@customElement('styled-title')
export class StyledTitle extends TailwindElement {
  render() {
    return html`
      <h2 class="flex flex-col text-4xl text-center">
        <slot></slot>
      </h2>
  `;
  }
}

export default StyledTitle;
