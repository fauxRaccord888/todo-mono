/* eslint-disable import/extensions */
/* lit */
import { html } from 'lit';
import { map } from 'lit/directives/map.js';
import { customElement, property, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { Todo, dueDateFormatter, yyyymmdd } from '@todo-mono/shared';
import { todoContextProvider } from '../contexts/todoContext';

import './styledComponents/StyledTitle';
import './styledComponents/StyledButton';
import './styledComponents/RoundedContainer';

/* tailwind */
import { TailwindElement } from '../TailwindComponent/tailwind.element';

@customElement('single-todo')
export class SingleTodo extends TailwindElement {
  private todoProvider = todoContextProvider;

  @property({ attribute: false })
  private todo!: Todo;

  @state()
  private isCompletedOpen = false;

  handleToggleCompleted() {
    this.isCompletedOpen = !this.isCompletedOpen;
  }

  handleAddCompletedRecord() {
    // eslint-disable-next-line no-alert
    const memo = window.prompt('완료를 축하합니다. 메모를 남겨주세요');
    this.todoProvider.addCompleted(this.todo, memo || ' ');
    this.requestUpdate(); // todo.completed가 수정되므로(todo의 주소는 그대로이므로) 변경이 반영되지 않음 => 수동 업데이트 필요
  }

  render() {
    return html`
      <div class="outer-container">
        <div class="due-date-container">
          <span>
            ${dueDateFormatter(this.todo.dueDate)}
          </span>
        </div>

        <div class="title-container">
          <span>
            ${this.todo.title}
          </span>
          <styled-button label="완료처리" @click=${this.handleAddCompletedRecord}>
            완료처리
          </styled-button>
        </div>

        <div class="tag-container">
          <rounded-container class="importance-container">
            중요도:
            ${this.todo.importance}
          </rounded-container>
          <rounded-container class="interval-container">
            반복 주기:
            ${this.todo.repeatInterval}
            일
          </rounded-container>
            ${this.todo.tags.map((tag) => (html`
              <rounded-container style=${styleMap({ backgroundColor: tag.color })}>
                ${tag.name}
              </rounded-container>
            `))}
        </div>

        <div>
          <styled-button 
            class="toggle-complete-button" 
            label="완료 내역 토글" 
            @click="${this.handleToggleCompleted}"
          >
            ${this.isCompletedOpen ? '완료 내역 닫기' : '완료 내역 보기'}
          </styled-button>
        </div>

        ${this.isCompletedOpen ? html`
          <div class="completed-container">
            ${map(this.todo.completed, (record) => html`
                <span class="completed-record">
                  ${record.memo}
                  <rounded-container class="completed-date">
                    ${yyyymmdd(record.completed)}
                  </rounded-container>
                </span>
              `)}
          </div>` : ''}
      </div>
    `;
  }
}

export default SingleTodo;
