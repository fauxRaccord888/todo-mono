/* eslint-disable import/extensions */
/* lit */
import { html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { consume } from '@lit/context';
import { Tag } from '@todo-mono/shared';
import { live } from 'lit/directives/live.js';
import { tagContext, tagContextProvider } from '../contexts/tagContext';
import { COLORS, INITIAL_VALUE } from '../constants/tag';

/* tailwind */
import { TailwindElement } from '../TailwindComponent/tailwind.element';

@customElement('tag-add-form')
class TagAddForm extends TailwindElement {
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
}

export default TagAddForm;
