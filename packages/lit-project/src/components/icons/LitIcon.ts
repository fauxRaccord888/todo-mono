/* eslint-disable import/extensions */
import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { TailwindElement } from '../../TailwindComponent/tailwind.element';

@customElement('lit-icon')
export default class MainContainer extends TailwindElement {
  @property({ attribute: false })
    class: string = '';

  render() {
    return html`
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            xmlns:xlink="http://www.w3.org/1999/xlink" 
            aria-hidden="true" 
            class="iconify iconify--logos ${this.class}"
            role="img" 
            preserveAspectRatio="xMidYMid meet" 
            viewBox="0 0 256 320"
        >
            <path fill="#00E8FF" d="m64 192l25.926-44.727l38.233-19.114l63.974 63.974l10.833 61.754L192 320l-64-64l-38.074-25.615z">
            </path>
            <path fill="#283198" d="M128 256V128l64-64v128l-64 64ZM0 256l64 64l9.202-60.602L64 192l-37.542 23.71L0 256Z">
            </path>
            <path fill="#324FFF" d="M64 192V64l64-64v128l-64 64Zm128 128V192l64-64v128l-64 64ZM0 256V128l64 64l-64 64Z">
            </path><path fill="#0FF" d="M64 320V192l64 64z">
            </path>
        </svg>
    `;
  }
}
