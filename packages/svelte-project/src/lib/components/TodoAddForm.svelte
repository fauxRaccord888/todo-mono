<script lang="ts">
    import { INITIAL_VALUE } from "../constants/todo";
    import { Tag, Todo } from "@todo-mono/shared";
    import { addDays } from "date-fns";
    import todoStore from "../store/todoStore";
    import tagStore from "../store/tagStore";  
    import RoundContainer from "./styledComponents/RoundContainer.svelte";
    import StyledButton from "./styledComponents/StyledButton.svelte";
    
    const initializeNewTodo = () => {
        newTodo = {
            ...INITIAL_VALUE,
            tags: new Array(),
            completed: new Array(),
        }        
    }

    let newTodo: typeof INITIAL_VALUE
    initializeNewTodo()
    let tags: Tag[]
    tagStore.subscribe((items) => tags = items) 

    const handleClickAddTodo = () => {
        const todo = new Todo({
            ...newTodo,
            dueDate: addDays(new Date(), newTodo.dueDatePlus),
        })
        todoStore.addTodo(todo);
        initializeNewTodo()
    };

    const handleSelectTag = (e: Event & { currentTarget: HTMLSelectElement }) => {
        const tag = tags.find((t) => t.name === e.currentTarget.value);
        if (!tag) return;
        newTodo.tags = [...newTodo.tags, tag]
    };

</script>

<div class="flex flex-col rounded-3xl bg-slate-400 py-8">
    <div class="bg-slate-400 flex-grow flex justify-center space-x-4 place-items-center py-4">
      <span>할 일 제목</span>
      <textarea
        value={newTodo.title}
        class="w-80 h-10 p-2"
        on:input={(e) => { newTodo.title = e.currentTarget.value; }}
      />
    </div>

    <div class="flex">
      <div class="bg-slate-400 flex-grow flex justify-center space-x-4 place-items-center py-4">
        <span>중요도</span>
        <input
          type="number"
          class="bg-slate-300 w-12 text-end"
          min={1}
          max={5}
          value={newTodo.importance}
          on:input={(e) => { newTodo.importance = Number(e.currentTarget.value); }}
        />
      </div>
      <div class="bg-slate-400 flex-grow flex justify-center space-x-4 place-items-center py-4">
        <span>반복 주기</span>
        <input
          type="number"
          class="bg-slate-300 w-12 text-end"
          min={0}
          max={31}
          value={newTodo.repeatInterval}
          on:input={(e) => { newTodo.repeatInterval = Number(e.currentTarget.value); }}
        />
      </div>
      <div class="bg-slate-400 flex-grow flex justify-center space-x-4 place-items-center py-4">
        <span>마감까지 남은 일수</span>
        <input
          type="number"
          class="bg-slate-300 w-12 text-end"
          min={0}
          max={31}
          value={newTodo.dueDatePlus}
          on:input={(e) => { newTodo.dueDatePlus = Number(e.currentTarget.value); }}
        />
      </div>
    </div>

    <div class="flex">
      <div class="bg-slate-400 flex-grow flex justify-center space-x-4 place-items-center py-4">
        <span>태그 추가</span>
        <select on:input={handleSelectTag}>
          {#each tags as tag}
            <option
                style="background-color: {tag.color}"
                value={tag.name}
                label={tag.name}
            />
            {/each}
        </select>
      </div>
      <div class="bg-slate-400 flex-grow flex justify-center space-x-4 place-items-center py-4">
        <span>현재 태그</span>
        {#each newTodo.tags as tag}
            <RoundContainer
                style="background-color: {tag.color}"
            >
              {tag.name}
            </RoundContainer>
        {/each}

      </div>
    </div>

    <StyledButton
      class="w-72 justify-self-center place-self-center mt-4"
      on:click={handleClickAddTodo}
    >
      추가하기
    </StyledButton>
  </div>
