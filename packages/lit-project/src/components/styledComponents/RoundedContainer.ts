/* eslint-disable import/extensions */
import { LitElement, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('rounded-container')
export class RoundedContainer extends LitElement {
  render() {
    return html`
      <span>
        <slot></slot>
      </span>
  `;
  }

  static styles = css`
    span {
        padding: 0.5rem;
        border-radius: 0.75rem;
        background-color: inherit;
    }
  `;
}

export default RoundedContainer;
