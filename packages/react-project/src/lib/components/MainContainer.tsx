import { Dispatch, PropsWithChildren } from 'react';
import { Tag, Todo } from '@todo-mono/shared';
import { TagAction, TodoAction } from '../types/Reducer';

import SingleTodo from './SingleTodo';
import StyledTitle from './styledComponents/StyledTitle';

import viteIcon from '../../assets/vite.svg'
import reactIcon from '../../assets/react.svg'
import TagAddForm from './TagAddForm';
import TodoAddForm from './TodoAddForm';



interface MainContainerProps {
  todos: Todo[]
  todoDispatch: Dispatch<TodoAction>
  tags: Tag[]
  tagDispatch: Dispatch<TagAction>
}

function MainContainer(props: PropsWithChildren<MainContainerProps>) {

  return (
    <div className="flex flex-col w-full place-items-center space-y-12 py-12 wanted-sans">
      <div className="space-y-4 w-full">
        <StyledTitle>
          <div className="flex items-center justify-center">
            React
            <img src={reactIcon} className="w-16 h-16" />
            +
            Vite
            <img src={viteIcon} className="w-16 h-16" />
          </div>
        </StyledTitle>
      </div>

      <div className="space-y-4 w-full">
        <StyledTitle>📝 할 일 추가하기</StyledTitle>
        <TodoAddForm tags={props.tags} dispatch={props.todoDispatch}/>
      </div>

      <div className="space-y-4 w-full">
        <StyledTitle>#️⃣ 태그 추가하기</StyledTitle>
        <TagAddForm dispatch={props.tagDispatch} />
      </div>

      <div className="space-y-4 w-full">
        <StyledTitle>⛳ 할 일 목록</StyledTitle>
          {props.todos.map((todo, idx) => (
            <SingleTodo key={idx} todo={todo} dispatch={props.todoDispatch} />
          ))}
      </div>

    </div>
  );
}

export default MainContainer