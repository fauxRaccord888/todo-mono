import { useEffect, useReducer } from 'preact/hooks';

import MainContainer from './lib/components/MainContainer';
import todoReducer from './lib/reducers/todoReducer';
import tagReducer from './lib/reducers/tagReducer';


export function App() {
  const [todoState, todoDispatch] = useReducer(todoReducer, []);
  const [tagState, tagDispatch] = useReducer(tagReducer, []);
  useEffect(() => {
    todoDispatch({ type: 'loadLocal' });
    tagDispatch({ type: 'loadLocal' });
  }, []);

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
