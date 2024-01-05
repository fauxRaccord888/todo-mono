/* eslint-disable import/extensions */
import { TailwindElement } from './TailwindComponent/tailwind.element';
import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { todoContextProvider } from './contexts/todoContext';
import { tagContextProvider } from './contexts/tagContext';
import './components/MainContainer';
import './app.css';

@customElement('main-app')
export class App extends TailwindElement {
  private todoProvider = todoContextProvider;
  private tagProvider = tagContextProvider;
  constructor() {
    super();
    this.todoProvider.loadLocal();
    this.tagProvider.loadLocal();
  }

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
