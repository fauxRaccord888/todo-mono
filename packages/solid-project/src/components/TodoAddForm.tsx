import tagStore from '../stores/TagStore';
import todoStore from '../stores/TodoStore';
import StyledButton from './styledComponents/StyledButton';
import NumericInput from './styledComponents/NumericInput'
import RoundedContainer from "./styledComponents/RoundedContainer"
import { For, createSignal } from 'solid-js';
import { addDays } from 'date-fns';

export default function AddTodoForm() {
  const { addTodo } = todoStore;
  const { tags } = tagStore

  const INITIAL_VALUE = {
    title: '',
    importance: 1,
    done: false,
    repeatInterval: 0,
    dueDatePlus: 0,
  };  

  const [newTodo, setNewTodo] = createSignal({
    ...INITIAL_VALUE,
    tags: new Array<DeserializedTag>(),
    completed: new Array<DeserializedCompleted>(),
  })


  const handleClickAddTodo = () => {
    addTodo({
      ...newTodo(),
      dueDate: addDays(new Date(), newTodo().dueDatePlus),
    });
    setNewTodo({
      ...INITIAL_VALUE,
      tags: new Array<DeserializedTag>(),
      completed: new Array<DeserializedCompleted>(),
    })
  };

  const handleSelectTag = (e: Event & { target: HTMLSelectElement}) => {
    const tag = tags.find((t) => t.name === e.target.value)
    if (!tag) return
    setNewTodo({...newTodo(), tags: [...newTodo().tags, tag]})
  }

  return (
    <div class="flex flex-col rounded-3xl bg-slate-400 py-8">
      <div class="bg-slate-400 flex-grow flex justify-center space-x-4 place-items-center py-4">
        <span>할 일 제목</span>
        <textarea
          value={newTodo().title}
          class="w-80 h-10 p-2"
          onInput={(e) => {newTodo().title = e.target.value}}
        />
      </div>

      <div class="flex">
        <div class="bg-slate-400 flex-grow flex justify-center space-x-4 place-items-center py-4">
          <span>중요도</span>
          <NumericInput
            class="bg-slate-300 w-12 text-end"
            min={1}
            max={5}
            value={newTodo().importance}
            onInput={(e) => {newTodo().importance = Number(e.target.value)}}
          />
        </div>
        <div class="bg-slate-400 flex-grow flex justify-center space-x-4 place-items-center py-4">
          <span>반복 주기</span>
          <NumericInput
            class="bg-slate-300 w-12 text-end"
            min={0}
            max={31}
            value={newTodo().repeatInterval}
            onInput={(e) => {newTodo().repeatInterval = Number(e.target.value)}}
          />
        </div>
        <div class="bg-slate-400 flex-grow flex justify-center space-x-4 place-items-center py-4">
          <span>마감까지 남은 일수</span>
          <NumericInput
            class="bg-slate-300 w-12 text-end"
            min={0}
            max={31}
            value={newTodo().dueDatePlus}
            onInput={(e) => {newTodo().dueDatePlus = Number(e.target.value)}}
          />
        </div>
      </div>

    <div class="flex">
      <div class="bg-slate-400 flex-grow flex justify-center space-x-4 place-items-center py-4">
        <span>태그 추가</span>
        <select
          onInput={handleSelectTag}
        >
          <For each={tags}>{(tag) =>(
            <option
              style={{'background-color': tag.color}}
              value={tag.name}
              label={tag.name}
            />
          )}</For>
        </select>
      </div>
      <div class="bg-slate-400 flex-grow flex justify-center space-x-4 place-items-center py-4">
        <span>현재 태그</span>
        <For each={newTodo().tags}>{(tag) =>(
            <RoundedContainer
              style={{'background-color': tag.color}}
            >
              {tag.name}
            </RoundedContainer>
          )}</For>

      </div>
    </div>

    <StyledButton
      class="w-72 justify-self-center place-self-center mt-4"
      onClick={handleClickAddTodo}
    >
      추가하기
    </StyledButton>
  </div>
  );
}
