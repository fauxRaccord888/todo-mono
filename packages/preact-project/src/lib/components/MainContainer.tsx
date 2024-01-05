import { useEffect } from 'preact/hooks';
import useTodoStore from '../hooks/useTodoStore';
import useTagStore from '../hooks/useTagStore';

import SingleTodo from './SingleTodo';
import StyledTitle from './styledComponents/StyledTitle';

import viteIcon from '../../assets/vite.svg';
import preactIcon from '../../assets/preact.svg';
import TagAddForm from './TagAddForm';
import TodoAddForm from './TodoAddForm';

function MainContainer() {
  const [todos, todoDispatch] = useTodoStore();
  const [tags, tagDispatch] = useTagStore();

  useEffect(() => {
    todoDispatch({ type: 'subscribe' });
    tagDispatch({ type: 'subscribe' });
    return (() => {
      todoDispatch({ type: 'unsubscribe' });
      tagDispatch({ type: 'unsubscribe' });
    });
  }, []);

  return (
    <div className="flex flex-col w-full place-items-center space-y-12 py-12 wanted-sans">
      <div className="space-y-4 w-full">
        <StyledTitle>
          <div className="flex items-center justify-center">
            Preact
            <img src={preactIcon} alt="react-icon" className="w-16 h-16" />
            +
            Vite
            <img src={viteIcon} alt="vite-icon" className="w-16 h-16" />
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
          <SingleTodo key={`${todo.title} ${String(idx)}`} todo={todo} dispatch={todoDispatch} />
        ))}
      </div>

    </div>
  );
}

export default MainContainer;
