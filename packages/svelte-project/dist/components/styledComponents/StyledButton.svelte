<button
    {...$$restProps}
    on:click
    class="{$$restProps.class} bg-gray-400 p-1 border-slate-800 border-2 border-solid rounded-2xl"
>
    <slot />
</button>
