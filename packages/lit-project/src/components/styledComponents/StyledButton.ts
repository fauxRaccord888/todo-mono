/* eslint-disable import/extensions */
import { LitElement, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('styled-button')
export class StyledButton extends LitElement {
  render() {
    return html`
      <button>
        <slot></slot>
      </button>
  `;
  }

  static styles = css`
    button {
        width: inherit;
        font-size: inherit;
        font-family: inherit;
        padding: 0.25rem;
        
        background-color: rgb(156 163 175);

        border-style: solid;
        border-color: rgb(30 41 59);
        border-width: 2px;
        border-radius: 1rem;
    }
  `;
}

export default StyledButton;
