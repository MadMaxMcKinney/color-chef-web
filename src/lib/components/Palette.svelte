<script lang="ts">
    export let colors: PaletteColor[];
</script>

<div class="flex flex-row overflow-hidden border-[3px] border-dark-brown rounded-2xl w-full h-32">
    {#each colors as color}
        <span class="h-full w-full" style="background-color: {color.hex};" />
    {/each}
</div>
