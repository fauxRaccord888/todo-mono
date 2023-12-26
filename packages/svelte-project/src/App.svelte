<script lang="ts">
    import { onMount } from "svelte";
    import todoStore from "./lib/store/todoStore";
    import tagStore from "./lib/store/tagStore";
    import MainContainer from "./lib/components/MainContainer.svelte";

    onMount(() => {
        todoStore.loadLocal()
        tagStore.loadLocal()
    })

</script>

<div class="flex w-full justify-center">
    <div class="w-[48rem]">
        <MainContainer />
    </div>
</div>