<script>
    const MAXIMUM_VISIBLE_FRAMEWORKS = 3
    
    const visible = {
        react: true,
        svelte: true,
        solid: true,
        lit: false, 
        vue: false,
        preact: false
    }

    const handleClick = (e, key) => {
        const showCount = Object.values(visible).filter((v) => v).length
        if (showCount >= MAXIMUM_VISIBLE_FRAMEWORKS && !visible[key]) {
            e.target.checked = false
            return
        }
        visible[key] = !visible[key]
    }
</script>

<div class="flex flex-col place-items-center w-full py-12 space-y-12">
    <div class="flex justify-center space-x-4">
        {#each Object.keys(visible) as key}
            <div>
                <span>{key}</span>
                <input type="checkbox" checked={visible[key]} on:input={(e) => handleClick(e, key)} />
            </div>
        {/each}
    </div>

    <div class="flex space-x-8 w-4/5">
        {#if visible.react} <div class="flex-grow"><slot name="react" /></div> {/if}
        {#if visible.svelte} <div class="flex-grow"><slot name="svelte" /></div> {/if}
        {#if visible.solid} <div class="flex-grow"><slot name="solid" /></div> {/if}
        {#if visible.lit} <div class="flex-grow"><slot name="lit" /></div> {/if}
        {#if visible.vue} <div class="flex-grow"><slot name="vue" /></div> {/if}
        {#if visible.preact} <div class="flex-grow"><slot name="preact" /></div> {/if}
    </div>
</div>

