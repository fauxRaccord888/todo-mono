import { component$, useContext, useTask$ } from '@builder.io/qwik';
/* HOOKS */
import { todosContext } from '../context/TodosContext';
import { tagsContext } from '../context/TagsContext';
/* COMPONENTS */
import StyledTitle from './styledComponents/StyledTitle';
import TodoAddForm from './TodoAddForm';
import TagAddForm from './TagAddForm';
import SingleTodo from './SingleTodo';
/* ICONS */
import QwikIcon from './Icons/QwikIcon';
import ViteIcon from './Icons/ViteIcon';

export default component$(() => {
  const todosStore = useContext(todosContext);
  const tagsStore = useContext(tagsContext);

  useTask$(({ cleanup }) => {
    todosStore.subscribeLocal$();
    tagsStore.subscribeLocal$();
    cleanup(() => {
      todosStore.unsubscribeLocal$();
      tagsStore.unsubscribeLocal$();
    });
  });

  return (
    <div class="flex flex-col w-full place-items-center space-y-12 py-12 wanted-sans">
      <div class="w-[48rem] space-y-4 items-center">
        <StyledTitle>
          <div class="flex items-center justify-center">
            Qwik
            <QwikIcon class="w-16 h-16" />
            +
            Vite
            <ViteIcon class="w-16 h-16" />
          </div>
        </StyledTitle>
      </div>

      <div class="w-[48rem] space-y-4">
        <StyledTitle>📝 할 일 추가하기</StyledTitle>
        <TodoAddForm />
      </div>

      <div class="w-[48rem] space-y-4">
        <StyledTitle>#️⃣ 태그 추가하기</StyledTitle>
        <TagAddForm />
      </div>

      <div class="w-[48rem] space-y-4">
        <StyledTitle>⛳ 할 일 목록</StyledTitle>
        {todosStore.items.map((todo) => <SingleTodo key={todo.title} todo={todo} />)}
        {/* DEBUG 오버헤드? */}
        {/* 공식 문서도 map을 써서 순회 및 DOM요소 생성 */}
        {/* https://qwik.builder.io/docs/components/rendering/ */}
      </div>
    </div>
  );
});
