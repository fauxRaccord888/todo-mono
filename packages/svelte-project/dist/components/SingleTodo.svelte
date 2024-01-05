<script>export let todo;
import { Todo, dueDateFormatter, yyyymmdd } from "@todo-mono/shared";
import todoStore from "../store/todoStore";
import StyledButton from "./styledComponents/StyledButton.svelte";
import RoundContainer from "./styledComponents/RoundContainer.svelte";
let isCompletedOpen = false;
function handleComplete() {
  const memo = window.prompt("\uC644\uB8CC\uB97C \uCD95\uD558\uD569\uB2C8\uB2E4. \uBA54\uBAA8\uB97C \uB0A8\uACA8\uC8FC\uC138\uC694.");
  todoStore.addCompleted(todo, memo || "\uC644\uB8CC");
}
</script>

<div class="flex-col space-y-4 border-2 border-slate-800 p-4 rounded-lg">
    <div class="flex items-center space-x-2">
      <span>
        { dueDateFormatter(todo.dueDate)}
      </span>
    </div>

    <div class="flex items-center p-2 border-slate-800 border-2 rounded-lg justify-between">
      <span>
        { todo.title }
      </span>
      <StyledButton on:click={handleComplete}>
        완료처리
      </StyledButton>
    </div>

    <div class="flex space-x-1">
      <RoundContainer class="bg-amber-400">
        중요도:
        { todo.importance }
      </RoundContainer>
      <RoundContainer class="bg-orange-400">
        반복 주기:
        { todo.repeatInterval }
        일
      </RoundContainer>
      {#each todo.tags as tag}
          <RoundContainer style="background-color: {tag.color} ">
            { tag.name }
          </RoundContainer>
        {/each}
    </div>

    <StyledButton
      class="w-full"
      on:click={() => isCompletedOpen = !isCompletedOpen}
    >
      { isCompletedOpen ? '완료 내역 닫기' : '완료 내역 보기' }
    </StyledButton>

    {#if isCompletedOpen}
      <div
        class="flex flex-col bg-gray-200 rounded-lg"
      >
        {#each todo.completed as record}
            <span
              class="flex justify-between items-center p-2"
            >
              { record.memo }
              <RoundContainer class="bg-slate-400">
                { yyyymmdd(record.completed) }
              </RoundContainer>
            </span>
        {/each}
      </div>
    {/if}
  </div>
