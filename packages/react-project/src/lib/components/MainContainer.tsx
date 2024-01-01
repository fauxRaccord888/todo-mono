import { Tag, Todo } from '@todo-mono/shared';
import { TagAction, TodoAction } from '../types/Reducer';

import SingleTodo from './SingleTodo';
import StyledTitle from './styledComponents/StyledTitle';

import ReactIcon from './icons/reactIcon';
import ViteIcon from './icons/ViteIcon';
import TagAddForm from './TagAddForm';
import TodoAddForm from './TodoAddForm';

interface MainContainerProps {
  todos: Todo[]
  todoDispatch: React.Dispatch<TodoAction>
  tags: Tag[]
  tagDispatch: React.Dispatch<TagAction>
}

function MainContainer(props: MainContainerProps) {
  const {
    todos, tags, todoDispatch, tagDispatch,
  } = props;
  return (
    <div className="flex flex-col w-full place-items-center space-y-12 py-12 wanted-sans">
      <div className="space-y-4 w-full">
        <StyledTitle>
          <div className="flex items-center justify-center">
            React
            <ReactIcon className="w-16 h-16" />
            +
            Vite
            <ViteIcon className="w-16 h-16" />
          </div>
        </StyledTitle>
      </div>

      <div className="space-y-4 w-full">
        <StyledTitle>📝 할 일 추가하기</StyledTitle>
        <TodoAddForm tags={tags} dispatch={todoDispatch} />
      </div>

      <div className="space-y-4 w-full">
        <StyledTitle>#️⃣ 태그 추가하기</StyledTitle>
        <TagAddForm dispatch={tagDispatch} />
      </div>

      <div className="space-y-4 w-full">
        <StyledTitle>⛳ 할 일 목록</StyledTitle>
        {todos.map((todo, idx) => (
          // DEBUG idx in key
          <SingleTodo
            key={`${todo.title} ${String(idx)}`}
            todo={todo}
            dispatch={todoDispatch}
          />
        ))}
      </div>

    </div>
  );
}

export default MainContainer;
