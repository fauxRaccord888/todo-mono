/* eslint-disable import/extensions */
import { TailwindElement } from './TailwindComponent/tailwind.element';
import { html } from 'lit';
import { customElement } from 'lit/decorators.js';

import './components/MainContainer';
import './app.css';

@customElement('main-app')
export class App extends TailwindElement {
  render() {
    return html`
      <div class="flex justify-center wanted-sans">
        <div class="w-[48rem]">
          <main-container></main-container>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'main-app': App
  }
}

export default App;
