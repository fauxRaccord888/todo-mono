/* eslint-disable import/extensions */
import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { consume } from '@lit/context';
import { CompletedRecord, Tag, Todo } from '@todo-mono/shared';
import { addDays } from 'date-fns';
import { live } from 'lit/directives/live.js';
import { tagContext } from '../contexts/tagContext';
import { todoContextProvider } from '../contexts/todoContext';
import { INITIAL_VALUE } from '../constants/todo';

@customElement('todo-add-form')
class TodoAddForm extends LitElement {
  private todoProvider = todoContextProvider;

  @consume({ context: tagContext, subscribe: true })
    tags!: Tag[];

  @state()
    newTodo = {
      ...INITIAL_VALUE,
      completed: new Array<CompletedRecord>(),
    };

  // tag를 분리하지 않으면 얕은 참조로 인해 알 수 없음
  // 즉, newTodo의 Tags를 조작해도 변화가 감지되지 않음(newTodo의 주소는 그대로)
  // this.requestUpdate() 메서드를 사용할 수 있지만 변화가 해당 컴포넌트에만 적용되므로 가급적 피함
  @state()
    newTodoTags = new Array<Tag>();

  initializeData() {
    this.newTodo = {
      ...INITIAL_VALUE,
      completed: new Array<CompletedRecord>(),
    };
    this.newTodoTags = new Array<Tag>();
  }

  handleAddNewTodo() {
    const newTodo = new Todo({
      ...this.newTodo,
      tags: this.newTodoTags,
      dueDate: addDays(new Date(), this.newTodo.dueDatePlus),
    });
    this.todoProvider.addTodo(newTodo);
    this.initializeData();
  }

  handleInputTitle = (ev: Event & { target: HTMLTextAreaElement }) => {
    this.newTodo.title = ev.target.value;
  };

  handleInputImportance = (ev: Event & { target: HTMLInputElement }) => {
    this.newTodo.importance = Number(ev.target.value);
  };

  handleInputInterval = (ev: Event & { target: HTMLInputElement }) => {
    this.newTodo.repeatInterval = Number(ev.target.value);
  };

  handleInputDueDate = (ev: Event & { target: HTMLInputElement }) => {
    this.newTodo.dueDatePlus = Number(ev.target.value);
  };

  handleSelectTag = (ev: Event & { target: HTMLSelectElement }) => {
    const newTag = this.tags.find((t) => t.name === ev.target.value);
    if (!newTag) return;
    if (this.newTodoTags.includes(newTag)) return;
    this.newTodoTags = [...this.newTodoTags, newTag];
  };

  render() {
    return html`
    <div class="outer-container">
      <div class="inner-container">
        <span>할 일 제목</span>
        <textarea
          .value=${live(this.newTodo.title)}
          class="title-text-area"
          @input=${this.handleInputTitle}
        ></textarea>
      </div>

      <div class="inner-container">
        <div class="inner-container">
          <span>중요도</span>
          <input
            type="number"
            class="number-input"
            min=${1}
            max=${5}
            .value=${live(String(this.newTodo.importance))}
            @input=${this.handleInputImportance}
          />

        </div>
        <div class="inner-container">
          <span>반복 주기</span>
          <input
            type="number"
            class="number-input"
            min=${0}
            max=${31}
            .value=${live(String(this.newTodo.repeatInterval))}
            @input=${this.handleInputInterval}
          />
        </div>
        <div class="inner-container">
          <span>마감까지 남은 일수</span>
          <input
            type="number"
            class="number-input"
            min=${0}
            max=${31}
            .value=${live(String(this.newTodo.dueDatePlus))}
            @input=${this.handleInputDueDate}
          />
        </div>
      </div>

      <div class="mid-container">
        <div class="inner-container">
          <span>태그 추가</span>
          <select
            id="tag-select"
            @change=${this.handleSelectTag}
          >
            ${this.tags.map((tag) => html`
              <option
                  .value=${tag.name}
                  label=${tag.name}
                  style=${styleMap({ backgroundColor: tag.color })}
              ></option>
            `)}
          </select>
        </div>
        <div class="inner-container">
          <span>현재 태그</span>
          ${this.newTodoTags.map((tag) => html`
            <rounded-container
              class="tag"
              style=${styleMap({ backgroundColor: tag.color })}
            >
                ${tag.name}
            </rounded-container>
            `)}

        </div>
      </div>

      <styled-button
        label="할 일 추가하기 버튼"
        class="add-todo-button"
        @click=${this.handleAddNewTodo}
      >
        추가하기
      </styled-button>
    </div>
    `;
  }

  static styles = css`
    span {
      font-size: 1.5rem;
    }

    select {
      margin-left: 1rem;
    }

    .outer-container {
        display: flex;
        flex-direction: column;
        border-radius: 1.5rem;
        background-color: rgb(148 163 184);
        padding-top: 2rem;
        padding-bottom: 2rem;
    }  

    .mid-container {
        display: flex;
    }

    .inner-container {
        display: flex;
        flex-grow: 1;
        justify-content: center;
        place-items: center;
        background-color: rgb(148 163, 184);
        padding-top: 2rem;
        padding-bottom: 2rem
    }

    .title-text-area {
        width: 20rem;
        height: 2.5rem;
        padding: 0.5rem;
        font-size: 1.5rem;
        font-family: inherit;
        margin-left: 1rem;
    }

    .number-input {
        background-color: rgb(203 213 225);
        width: 3rem;
        text-align: end;
        margin-left: 0.25rem;
        font-size: inherit;
    }

    .tag {
      margin-left: 0.5rem;
    }

    .add-todo-button {
        width: 18rem;
        justify-self: center;
        place-self: center;
        margin-top: 1rem;
    }

  `;
}

export default TodoAddForm;
