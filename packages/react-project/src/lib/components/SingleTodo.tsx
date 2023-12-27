import { Dispatch, useState } from 'react';
import { Todo, dueDateFormatter, yyyymmdd } from '@todo-mono/shared';
import { TodoAction } from '../types/Reducer';

import RoundContainer from './styledComponents/RoundContainer';
import StyledButton from './styledComponents/StyledButton';

function SingleTodo(props: { todo: Todo, dispatch: Dispatch<TodoAction> }) {
  const [isCompletedOpen, setIsCompletedOpen] = useState(false);
  
  const onComplete = () => {
    const memo = window.prompt('완료를 축하합니다. 메모를 남겨주세요') || '완료';
    props.dispatch({type: 'addCompleted', payload: {todo: props.todo, memo}})
  };

  return (
    <div className="flex-col space-y-4 border-2 border-slate-800 p-4 rounded-lg">
      <div className="flex items-center space-x-2">
        <span>
          { dueDateFormatter(props.todo.dueDate) }
        </span>
      </div>

      <div className="flex items-center p-2 border-slate-800 border-2 rounded-lg justify-between">
        <span>
          { props.todo.title }
        </span>
        <StyledButton onClick={onComplete}>
          완료처리
        </StyledButton>
      </div>

      <div className="flex space-x-1">
        <RoundContainer className="bg-amber-400">
          중요도:
          { props.todo.importance }
        </RoundContainer>
        <RoundContainer className="bg-orange-400">
          반복 주기:
          { props.todo.repeatInterval }
          일
        </RoundContainer>
        {props.todo.tags.map((tag, idx) => (
            <RoundContainer key={idx} style={{ background: tag.color }}>
            { tag.name }
            </RoundContainer>
        ))}
      </div>

      <StyledButton
        className="w-full"
        onClick={() => setIsCompletedOpen(!isCompletedOpen)}
      >
        { isCompletedOpen ? '완료 내역 닫기' : '완료 내역 보기' }
      </StyledButton>

      {isCompletedOpen ? (
          <div className="flex flex-col bg-gray-200 rounded-lg">
              {props.todo.completed.map((record, idx) => (
                  <span key={idx} className="flex justify-between items-center p-2">
                      { record.memo }
                      <RoundContainer className="bg-slate-400">
                          { yyyymmdd(record.completed) }
                      </RoundContainer>
                  </span>
              ))}
          </div>
      ) : (<></>)}
    </div>
  );
}


export default SingleTodo