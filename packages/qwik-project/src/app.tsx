import { component$ } from '@builder.io/qwik';
import './app.css';
import MainContainer from './components/MainContainer';
import TodoContextProvider from './context/TodosContext';
import TagsContextProvider from './context/TagsContext';

export const App = component$(() => (
  <TodoContextProvider>
    <TagsContextProvider>
      <MainContainer />
    </TagsContextProvider>
  </TodoContextProvider>
));

export default App;
