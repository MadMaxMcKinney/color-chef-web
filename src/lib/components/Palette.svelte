<script lang="ts">
    import IconCopy from 'virtual:icons/ph/clipboard-text-bold';
    import toast from 'svelte-french-toast';

    export let palette: Palette;

    /**
     * Copy the color to the clipboard
     * @param color The color to copy
     */
    function copyColor(color: PaletteColor) {
        navigator.clipboard.writeText(color.hex);
        toast.success(`Copied to clipboard ${color.hex}`);
    }
</script>

<div class="flex flex-col gap-4">
    <p class="font-medium text-lg max-w-[80%]">{palette.name}</p>
    <div class="flex flex-row overflow-hidden border-[3px] border-dark-brown rounded-2xl w-full h-32">
        {#each palette.colors as color}
            <button class="h-full w-full flex justify-center items-center group transition-all hover:shadow-2xl hover:z-10 hover:scale-110 active:scale-100" style="background-color: {color.hex};" on:click={() => copyColor(color)}>
                <span class="text-xl bg-white rounded-full p-2 transition-all opacity-0 group-hover:opacity-100"><IconCopy /></span>
            </button>
        {/each}
    </div>
</div>
