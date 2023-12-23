/* eslint-disable import/extensions */
import { LitElement, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('styled-title')
export class StyledTitle extends LitElement {
  render() {
    return html`
      <h2>
        <slot></slot>
      </h2>
  `;
  }

  static styles = css`
    h2 {
      display: flex;
      flex-direction: column;
      font-size: 2.25rem;
      line-height: 2.5rem;
      text-align: center;
    }
  `;
}

export default StyledTitle;
