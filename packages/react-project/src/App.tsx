import { useEffect, useReducer } from 'react'
import { todoReducer } from './lib/reducers/todoReducer';
import MainContainer from './lib/components/MainContainer';
import { tagReducer } from './lib/reducers/tagReducer';

function App() {
  const [todoState, todoDispatch] = useReducer(todoReducer, [])
  const [tagState, tagDispatch] = useReducer(tagReducer, [])
  useEffect(() => {
    todoDispatch({type: 'loadLocal'})
    tagDispatch({type: 'loadLocal'})
  }, [])

  return (
    <div class="flex justify-center">
      <div class="w-[48rem]">
        <MainContainer 
          tags={tagState} tagDispatch={tagDispatch}
          todos={todoState} todoDispatch={todoDispatch} 
        />
      </div>
    </div>
  )
}

export default App
