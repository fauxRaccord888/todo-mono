import { useState } from 'react';
import { Tag } from '@todo-mono/shared';
import { COLORS, INITIAL_VALUE } from '../constants/tag';
import { TagAction } from '../types/Reducer';

import StyledButton from './styledComponents/StyledButton';

function TagAddForm(props: { dispatch: React.Dispatch<TagAction> }) {
  const [newTag, setNewTag] = useState({ ...INITIAL_VALUE });
  const { dispatch } = props;

  const handleNameInput: React.FormEventHandler<HTMLTextAreaElement> = (e) => {
    setNewTag({ ...newTag, name: e.currentTarget.value });
  };

  const handleColorSelect: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    setNewTag({ ...newTag, color: e.currentTarget.value });
  };

  const handleAddTag = () => {
    const tag = new Tag(newTag);
    dispatch({ type: 'addItem', payload: { item: tag } });
    setNewTag({ ...INITIAL_VALUE });
  };

  return (
    <div className="flex flex-col rounded-3xl bg-slate-400 py-8">
      <div className="bg-slate-400 flex-grow flex justify-center space-x-4 place-items-center py-4">
        <span>태그 제목</span>
        <textarea
          value={newTag.name}
          onInput={handleNameInput}
          className="w-80 h-10 p-2"
        />
      </div>

      <div className="flex">
        <div className="bg-slate-400 flex-grow flex justify-center space-x-4 place-items-center py-4">
          <span>태그 색상</span>
          <select
            value={newTag.color}
            onChange={handleColorSelect}
          >
            {COLORS.map((color) => (
              <option
                key={color.label}
                label={color.label}
                value={color.value}
                style={{ backgroundColor: color.value }}
              >
                {color.label}
              </option>
            ))}
          </select>
        </div>

        <div className="bg-slate-400 flex-grow flex justify-center space-x-4 place-items-center py-4">
          <StyledButton
            className="w-72 justify-self-center place-self-center mt-4"
            onClick={handleAddTag}
          >
            추가하기
          </StyledButton>
        </div>
      </div>
    </div>
  );
}

export default TagAddForm;
