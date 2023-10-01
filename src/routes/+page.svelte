<script lang="ts">
    import logo from '$lib/assets/color-chef-logo.svg';
    import Palettes from '$lib/components/Palette.svelte';
    import IconInfo from 'virtual:icons/ph/info-fill';

    let prompt: string = '';
    $: promptLength = prompt.length;
    // Client side length limit for the prompt. The server will also check this.
    $: {
        if (prompt.length > 100) {
            prompt = prompt.slice(0, 100);
        }
    }

    function createPalette() {
        palette = undefined;
    }

    let palette: Palette | undefined = {
        name: 'Beach wedding in Italy',
        colors: [
            {
                name: 'Primary',
                value: '#FFD700'
            },
            {
                name: 'Secondary',
                value: '#FFA500'
            },
            {
                name: 'Primary',
                value: '#FFD700'
            },
            {
                name: 'Secondary',
                value: '#FFA500'
            }
        ]
    };
</script>

<div class="max-w-[524px] px-6 mt-20 flex flex-col mx-auto">
    <img src={logo} alt="Color chef" class="w-full" />
    <section class="mt-14">
        <p class="font-bold text-lg">How to use</p>
        <p class="font-medium text-lg">Generate a color palette by describing how it will be used. <br /> <span class="italic">The Chef</span> will do the rest, sick back and enjoy!</p>
    </section>
    <div class="mt-16">
        <form on:submit|preventDefault={createPalette}>
            <div class="flex flex-col gap-2">
                <span class="flex gap-1 items-center self-end text-amber-500 font-medium">Show examples <IconInfo /></span>
                <input
                    name="prompt"
                    placeholder="Beach wedding in Italy"
                    class="border-[3px] border-dark-brown rounded-2xl p-3 w-full text-lg text-center font-medium text-dark-brown transition-all hover:shadow-lg hover:-translate-y-[2px] focus-visible:outline-amber-300 outline-offset-4"
                    bind:value={prompt}
                />
                <span class="self-end text-amber-500 font-medium text-sm">{promptLength}/100</span>
            </div>
        </form>
    </div>
    {#if palette}
        <div class="mt-16">
            <Palettes {palette} />
        </div>
    {/if}
    <footer class="font-medium flex justify-center items-center pb-8 pt-32">
        <p>A weekend project by <a href="https://maxmckinney.com" class="underline font-bold">Max McKinney</a></p>
    </footer>
</div>
