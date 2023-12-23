/* eslint-disable import/extensions */
import { customElement } from 'lit/decorators.js';
import { LitElement, css, html } from 'lit';
import { consume } from '@lit/context';
import { Todo } from '@todo-mono/shared';
import { map } from 'lit/directives/map.js';
import { todoContext } from '../contexts/todoContext';

import LitIcon from '../assets/lit.svg';
import ViteIcon from '../assets/vite.svg';

import './SingleTodo';
import './TodoAddForm';
import './TagAddForm';

@customElement('main-container')
export class MainContainer extends LitElement {
  @consume({ context: todoContext, subscribe: true })
    todos!: Todo[];

  render() {
    return html`
      <div class="main-container">
        <div class="flex-container">
          Lit
          <img class="icon" src=${LitIcon}><img>
          + Vite
          <img class="icon" src=${ViteIcon}><img>
        </div>
        <div>
          <styled-title>📝 할 일 추가하기</styled-title>
          <todo-add-form></todo-add-form>
        </div>

        <div>
          <styled-title>#️⃣ 태그 추가하기</styled-title>
          <tag-add-form></tag-add-form>
        </div>
  
        <div>
          <styled-title>⛳ 할 일 목록</styled-title>
          ${map(this.todos, (t) => html`<single-todo class="single-todo-container" .todo=${t}></single-todo>`)}
        </div>
      </div>
    `;
  }

  static styles = css`
    .main-container {      
      font-family: "Wanted Sans Variable" !important;
      margin-left: 20%;
      width: 60%;
    }

    .flex-container {
      font-size: 3rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .icon {
      width: 2rem;
      height: 2rem;
    }
  `;
}

export default MainContainer;
