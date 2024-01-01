import { useState } from 'react';
import { addDays } from 'date-fns';
import { CompletedRecord, Tag, Todo } from '@todo-mono/shared';
import { TodoAction } from '../types/Reducer';
import { INITIAL_VALUE } from '../constants/todo';

import StyledButton from './styledComponents/StyledButton';
import RoundContainer from './styledComponents/RoundContainer';

type TodoAddProps = {
  tags: Tag[]
  dispatch: React.Dispatch<TodoAction>
};

function TodoAddForm(props: TodoAddProps) {
  const [newTodo, setNewTodo] = useState({
    ...INITIAL_VALUE,
    tags: new Array<Tag>(),
    completed: new Array<CompletedRecord>(),
  });

  const { tags, dispatch } = props;

  const handleClickAddTodo = () => {
    const item = new Todo({
      ...newTodo,
      dueDate: addDays(new Date(), newTodo.dueDatePlus),
    });
    dispatch({ type: 'addItem', payload: { item } });
    setNewTodo({
      ...INITIAL_VALUE,
      tags: new Array<Tag>(),
      completed: new Array<CompletedRecord>(),
    });
  };

  const handleSelectTag: React.FormEventHandler<HTMLSelectElement> = (e) => {
    const tag = tags.find((t) => t.name === e.currentTarget.value);
    if (!tag) return;
    setNewTodo({ ...newTodo, tags: [...newTodo.tags, tag] });
  };

  const handleNumericInput: React.FormEventHandler<HTMLInputElement> = (e) => {
    setNewTodo({
      ...newTodo,
      [e.currentTarget.name]: Number(e.currentTarget.value),
    });
  };

  return (
    <div className="flex flex-col rounded-3xl bg-slate-400 py-8">
      <div className="bg-slate-400 flex-grow flex justify-center space-x-4 place-items-center py-4">
        <span>할 일 제목</span>
        <textarea
          value={newTodo.title}
          className="w-80 h-10 p-2"
          onInput={(e) => setNewTodo({ ...newTodo, title: e.currentTarget.value })}
        />
      </div>

      <div className="flex">
        <div className="bg-slate-400 flex-grow flex justify-center space-x-4 place-items-center py-4">
          <span>중요도</span>
          <input
            type="number"
            className="bg-slate-300 w-12 text-end"
            min={1}
            max={5}
            value={newTodo.importance}
            name="importance"
            onInput={handleNumericInput}
          />

        </div>
        <div className="bg-slate-400 flex-grow flex justify-center space-x-4 place-items-center py-4">
          <span>반복 주기</span>
          <input
            type="number"
            className="bg-slate-300 w-12 text-end"
            min={0}
            max={31}
            value={newTodo.repeatInterval}
            name="repeatInterval"
            onInput={handleNumericInput}
          />
        </div>
        <div className="bg-slate-400 flex-grow flex justify-center space-x-4 place-items-center py-4">
          <span>마감까지 남은 일수</span>
          <input
            type="number"
            className="bg-slate-300 w-12 text-end"
            min={0}
            max={31}
            value={newTodo.dueDatePlus}
            name="dueDatePlus"
            onInput={handleNumericInput}
          />
        </div>
      </div>

      <div className="flex">
        <div className="bg-slate-400 flex-grow flex justify-center space-x-4 place-items-center py-4">
          <span>태그 추가</span>
          <select onInput={handleSelectTag}>
            {tags.map((tag, idx) => (
              <option
                key={`${tag.name} ${String(idx)}`}
                style={{ backgroundColor: tag.color }}
                value={tag.name}
                label={tag.name}
              />
            ))}
          </select>
        </div>
        <div className="bg-slate-400 flex-grow flex justify-center space-x-4 place-items-center py-4">
          <span>현재 태그</span>
          {newTodo.tags.map((tag) => (
            <RoundContainer style={{ backgroundColor: tag.color }}>
              {tag.name}
            </RoundContainer>
          ))}
        </div>
      </div>

      <StyledButton
        className="w-72 justify-self-center place-self-center mt-4"
        onClick={handleClickAddTodo}
      >
        추가하기
      </StyledButton>
    </div>
  );
}

export default TodoAddForm;
