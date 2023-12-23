/* eslint-disable import/extensions */
import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { consume } from '@lit/context';
import { Tag } from '@todo-mono/shared';
import { live } from 'lit/directives/live.js';
import { tagContext, tagContextProvider } from '../contexts/tagContext';
import { COLORS, INITIAL_VALUE } from '../constants/tag';

@customElement('tag-add-form')
class TagAddForm extends LitElement {
  private tagProvider = tagContextProvider;

  @consume({ context: tagContext })
    tags!: Tag[];

  @state()
    newTag = { ...INITIAL_VALUE };

  handleAddNewTag() {
    const newTag = new Tag({
      name: this.newTag.name,
      color: this.newTag.color,
    });
    this.tagProvider.addTag(newTag);
    this.newTag = { ...INITIAL_VALUE };
  }

  handleInputTagName = (ev: Event & { target : HTMLTextAreaElement }) => {
    this.newTag.name = ev.target.value;
  };

  handleSelectColor = (ev: Event & { target : HTMLSelectElement }) => {
    this.newTag.color = ev.target.value;
  };

  render() {
    return html`
    <div class="outer-container">
      <div class="inner-container">
        <span>태그 제목</span>
        <textarea
          .value=${live(this.newTag.name)}
          @input=${this.handleInputTagName}
          class="tag-text-area"
        ></textarea>
      </div>

      <div class="flex-container">
        <div class="inner-container">
          <span>태그 색상</span>
          <select
            .value=${live(this.newTag.color)}
            @change=${this.handleSelectColor}
          >
            ${COLORS.map((color) => html`
                <option
                  .value=${color.value}
                  label=${color.label}
                  style=${styleMap({ 'background-color': color.value })}
                >
                  ${color.label}
                </option>
              `)}
          </select>
        </div>

        <div class="inner-container">
          <styled-button
            label="태그 추가하기"
            class="add-tag-button"
            @click=${this.handleAddNewTag}
          >
            추가하기
          </styled-button>
        </div>
      </div>
    </div>
    `;
  }

  static styles = css`
    .outer-container {
      display: flex;
      flex-direction: column;
      border-radius: 1.5rem;
      background-color: rgb(148 163 184);
      padding-top: 2rem;
      padding-bottom: 2rem
    }

    .inner-container {
      background-color: rgb(148 163 184);
      display: flex;
      flex-grow: 1;
      justify-content: center;
      place-items: center;
      padding-top: 1rem;
      padding-bottom: 1rem
    }

    .inner-container > span {
      margin-right: 1rem;
    }

    .tag-text-area {
      width: 20rem;
      height: 2.5rem;
      padding: 0.5rem;
      font-family: inherit;
      font-size: inherit;
    }

    .flex-container {
      display: flex
    }

    .add-tag-button {
      width: 18rem;
      justify-self: center;
      place-self: center;
      margin-top: 1rem;
    }
  `;
}

export default TagAddForm;
