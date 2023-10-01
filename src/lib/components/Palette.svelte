<script lang="ts">
    export let palette: Palette;
</script>

<div class="flex flex-row overflow-hidden border-[3px] border-dark-brown rounded-2xl w-full h-32">
    {#each palette.colors as color}
        <span class="h-full w-full" style="background-color: {color.value};" />
    {/each}
</div>
