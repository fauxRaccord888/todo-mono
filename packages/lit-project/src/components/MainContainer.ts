/* eslint-disable import/extensions */
/* lit */
import { customElement } from 'lit/decorators.js';
import { html } from 'lit';
import { consume } from '@lit/context';
import { map } from 'lit/directives/map.js';

/* utility */
import type { Todo } from '@todo-mono/shared';
import { todoContext, todoContextProvider } from '../contexts/todoContext';
import { tagContextProvider } from '../contexts/tagContext';

import './icons/LitIcon'
import './icons/ViteIcon'
import './SingleTodo';
import './TodoAddForm';
import './TagAddForm';

/* tailwind */
import { TailwindElement } from '../TailwindComponent/tailwind.element';

@customElement('main-container')
export default class MainContainer extends TailwindElement {
  private todoProvider = todoContextProvider;
  private tagProvider = tagContextProvider;

  constructor() {
    super();
    this.todoProvider.subscribe();
    this.tagProvider.subscribe();
  }

  @consume({ context: todoContext, subscribe: true })
    todos!: Todo[];

  render() {
    return html`
    <div class="flex flex-col place-items-center space-y-12 wanted-sans">
        <div class="space-y-4 w-full">
          <styled-title>
            <div class="flex items-center justify-center">
              Lit
              <lit-icon class="w-12 h-12 m-4"></lit-icon>
              +
              Vite
              <vite-icon class="w-16 h-16"></vite-icon>
            </div>
          </styled-title>
        </div>

        <div class="space-y-4 w-full">
          <styled-title>📝 할 일 추가하기</styled-title>
          <todo-add-form></todo-add-form>
        </div>

        <div class="space-y-4 w-full">
          <styled-title>#️⃣ 태그 추가하기</styled-title>
          <tag-add-form></tag-add-form>
        </div>
  
        <div class="space-y-4 w-full">
          <styled-title>⛳ 할 일 목록</styled-title>
          ${map(this.todos, (t) => html`<single-todo .todo=${t}></single-todo>`)}
        </div>
      </div>
    `;
  }
}
