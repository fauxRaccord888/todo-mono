<script>import { onMount, onDestroy } from "svelte";
import tagStore from "../store/tagStore";
import todoStore from "../store/todoStore";
import ViteIcon from "./icons/ViteIcon.svelte";
import SvelteIcon from "./icons/SvelteIcon.svelte";
import SingleTodo from "./SingleTodo.svelte";
import TagAddForm from "./TagAddForm.svelte";
import TodoAddForm from "./TodoAddForm.svelte";
import StyledTitle from "./styledComponents/StyledTitle.svelte";
onMount(() => {
  todoStore.subscribeLocal();
  tagStore.subscribeLocal();
  return () => {
    todoStore.unsubscribeLocal();
    tagStore.unsubscribeLocal();
  };
});
let todos;
todoStore.subscribe((items) => {
  todos = items;
});
</script>

<div class="flex flex-col place-items-center space-y-12 wanted-sans">
    <div class="space-y-4 w-full">
        <StyledTitle>
            <div class="flex items-center justify-center">
              Svelte
              <SvelteIcon class="w-16 h-16" />
              +
              Vite
              <ViteIcon class="w-16 h-16" />
            </div>
          </StyledTitle>
    </div>

    <div class="space-y-4 w-full">
        <StyledTitle>📝 할 일 추가하기</StyledTitle>
        <TodoAddForm />
    </div>

    <div class="space-y-4 w-full">
        <StyledTitle>#️⃣ 태그 추가하기</StyledTitle>
        <TagAddForm />
    </div>

    <div class="space-y-4 w-full">
        <StyledTitle>⛳ 할 일 목록</StyledTitle>
            {#each todos as todo}
                <SingleTodo todo={todo}/>
            {/each}
    </div>
</div>