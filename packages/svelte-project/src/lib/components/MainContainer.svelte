<script lang="ts">
    import { onMount, onDestroy } from "svelte";
    import type { Todo } from "@todo-mono/shared";

    import tagStore from "../store/tagStore"
    import todoStore from "../store/todoStore";
    import SingleTodo from "./SingleTodo.svelte";
    import TagAddForm from "./TagAddForm.svelte";
    import TodoAddForm from "./TodoAddForm.svelte";
    import StyledTitle from "./styledComponents/StyledTitle.svelte";
    
    onMount(() => {
        todoStore.subscribeLocal()
        tagStore.subscribeLocal()
    })

    onDestroy(() => {
        todoStore.unsubscribeLocal()
        tagStore.unsubscribeLocal()
    })


    let todos: Todo[]
    todoStore.subscribe((items: Todo[]) => {
        todos = items
    })
</script>

<div class="wanted-sans space-y-12">
    <div>
        <StyledTitle>📝 할 일 추가하기</StyledTitle>
        <TodoAddForm />
    </div>

    <div>
        <StyledTitle>#️⃣ 태그 추가하기</StyledTitle>
        <TagAddForm />
    </div>

    <div class="space-y-4">
        <StyledTitle>⛳ 할 일 목록</StyledTitle>
            {#each todos as todo}
                <SingleTodo todo={todo}/>
            {/each}
    </div>
</div>