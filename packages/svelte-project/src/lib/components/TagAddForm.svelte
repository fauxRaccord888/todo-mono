<script lang="ts">
    import { Tag } from "@todo-mono/shared";
    import { INITIAL_VALUE, COLORS } from "../constants/tag";
    import tagStore from "../store/tagStore";
    import StyledButton from "./styledComponents/StyledButton.svelte";

    let newTag: typeof INITIAL_VALUE

    const initializeNewTag = () => {newTag = {...INITIAL_VALUE}}
    
    const handleNameInput = (e: Event & { currentTarget: EventTarget & HTMLTextAreaElement; }) => {
        newTag.name = e.currentTarget.value
    };
    
    const handleColorSelect = (e: Event & { currentTarget: HTMLSelectElement }) => {
        newTag.color = e.currentTarget.value
    };
    
    const handleAddTag = () => {
        const tag = new Tag({...newTag})
        tagStore.addTag(tag);
        initializeNewTag()
    };

    $: initializeNewTag()
</script>

<div class="flex flex-col rounded-3xl bg-slate-400 py-8">
    <div class="bg-slate-400 flex-grow flex justify-center space-x-4 place-items-center py-4">
    <span>태그 제목</span>
    <textarea
        on:input={handleNameInput}
        class="w-80 h-10 p-2"
        value={newTag.name}
    />
    </div>

    <div class="flex">
    <div class="bg-slate-400 flex-grow flex justify-center space-x-4 place-items-center py-4">
        <span>태그 색상</span>
        <select on:change={handleColorSelect} value={newTag.color} >
            {#each COLORS as color}
                <option
                    label={color.label}
                    value={color.value}
                    style="background-color: {color.value}"
                >
                    {color.label}
                </option>
            {/each}
        </select>
    </div>

    <div class="bg-slate-400 flex-grow flex justify-center space-x-4 place-items-center py-4">
        <StyledButton
            class="w-72 justify-self-center place-self-center mt-4"
            on:click={handleAddTag}
        >
            추가하기
        </StyledButton>
    </div>
    </div>
</div>
