import MainContainer from './lib/components/MainContainer';
import useTodoStore from './lib/hooks/useTodoStore';
import useTagStore from './lib/hooks/useTagStore';

function App() {
  const [todoState, todoDispatch] = useTodoStore();
  const [tagState, tagDispatch] = useTagStore();

  return (
    <div className="flex justify-center">
      <div className="w-[48rem]">
        <MainContainer
          tags={tagState}
          tagDispatch={tagDispatch}
          todos={todoState}
          todoDispatch={todoDispatch}
        />
      </div>
    </div>
  );
}

export default App;
