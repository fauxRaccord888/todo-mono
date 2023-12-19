import { onMount } from 'solid-js';
import './App.css';
import MainContainer from './components/MainContainer';
import todoStore from './stores/TodoStore';
import tagStore from './stores/TagStore';

function App() {
  const { loadLocal: loadLocalTodo } = todoStore;
  const { loadLocal: loadLocalTag } = tagStore;

  onMount(() => {
    loadLocalTodo();
    loadLocalTag();
  });

  return (
    <MainContainer />
  );
}

export default App;
