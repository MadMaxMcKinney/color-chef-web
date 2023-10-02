<script lang="ts">
    import IconCopy from 'virtual:icons/ph/clipboard';
    import toast from 'svelte-french-toast';

    export let colors: PaletteColor[];

    function copyColor(color: PaletteColor) {
        // Copy the color to the clipboard
        navigator.clipboard.writeText(color.hex);
        toast.success(`Copied to clipboard ${color.hex}`);
    }
</script>

<div class="flex flex-row overflow-hidden border-[3px] border-dark-brown rounded-2xl w-full h-32">
    {#each colors as color}
        <button class="h-full w-full flex justify-center items-center group" style="background-color: {color.hex};" on:click={() => copyColor(color)}>
            <span class="text-xl bg-white rounded-full p-2 transition-all opacity-0 group-hover:opacity-100"><IconCopy /></span>
        </button>
    {/each}
</div>
