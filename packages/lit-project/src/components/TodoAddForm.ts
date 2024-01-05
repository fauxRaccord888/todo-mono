/* eslint-disable import/extensions */
/* lit */
import { html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { live } from 'lit/directives/live.js';
import { styleMap } from 'lit/directives/style-map.js';
import { consume } from '@lit/context';

/* utility */
import { CompletedRecord, Tag, Todo } from '@todo-mono/shared';
import { addDays } from 'date-fns';
import { tagContext } from '../contexts/tagContext';
import { todoContextProvider } from '../contexts/todoContext';
import { INITIAL_VALUE } from '../constants/todo';

/* tailwind */
import { TailwindElement } from '../TailwindComponent/tailwind.element';

@customElement('todo-add-form')
class TodoAddForm extends TailwindElement {
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
    <div class="flex flex-col rounded-3xl bg-slate-400 py-8">
      <div class="bg-slate-400 flex-grow flex justify-center space-x-4 place-items-center py-4">
        <span>할 일 제목</span>
        <textarea
          .value=${live(this.newTodo.title)}
          class="w-80 h-10 p-2"
          @input=${this.handleInputTitle}
        ></textarea>
      </div>

      <div class="flex">
        <div class="bg-slate-400 flex-grow flex justify-center space-x-4 place-items-center py-4">
          <span>중요도</span>
          <input
            type="number"
            class="bg-slate-300 w-12 text-end"
            min=${1}
            max=${5}
            .value=${live(String(this.newTodo.importance))}
            @input=${this.handleInputImportance}
          />

        </div>
        <div class="bg-slate-400 flex-grow flex justify-center space-x-4 place-items-center py-4">
          <span>반복 주기</span>
          <input
            type="number"
            class="bg-slate-300 w-12 text-end"
            min=${0}
            max=${31}
            .value=${live(String(this.newTodo.repeatInterval))}
            @input=${this.handleInputInterval}
          />
        </div>
        <div class="bg-slate-400 flex-grow flex justify-center space-x-4 place-items-center py-4">
          <span>마감까지 남은 일수</span>
          <input
            type="number"
            class="bg-slate-300 w-12 text-end"
            min=${0}
            max=${31}
            .value=${live(String(this.newTodo.dueDatePlus))}
            @input=${this.handleInputDueDate}
          />
        </div>
      </div>

      <div class="flex">
        <div class="bg-slate-400 flex-grow flex justify-center space-x-4 place-items-center py-4">
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
        <div class="bg-slate-400 flex-grow flex justify-center space-x-4 place-items-center py-4">
          <span>현재 태그</span>
          ${this.newTodoTags.map((tag) => html`
            <rounded-container
              class="tag"
              color="${tag.color}"
            >
                ${tag.name}
            </rounded-container>
            `)}

        </div>
      </div>

      <styled-button
        label="할 일 추가하기 버튼"
        class="w-72 justify-self-center place-self-center mt-4"
        @click=${this.handleAddNewTodo}
      >
        추가하기
      </styled-button>
    </div>
    `;
  }
}

export default TodoAddForm;
