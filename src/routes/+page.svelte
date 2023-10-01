<script lang="ts">
    import logo from '$lib/assets/color-chef-logo.svg';
    import Palettes from '$lib/components/Palette.svelte';
    import IconInfo from 'virtual:icons/ph/info-fill';
    import type { ActionData, PageData } from './$types';
    import { superForm } from 'sveltekit-superforms/client';
    import Palette from '$lib/components/Palette.svelte';

    export let data: PageData;
    const { form, enhance, errors } = superForm(data.form, {
        applyAction: false,
        async onResult({ result }) {
            if (result.type === 'success') {
                let res = await fetch(`/api/palette?prompt=${$form.prompt}`, {
                    method: 'GET'
                });
                // Get the data from the response
                let data = await res.json();
                // Parse the data following the OpenAI schema https://platform.openai.com/docs/api-reference/chat/object
                palette = JSON.parse(data.message.content);
                console.log(palette);
            }
        }
    });

    let showExamples: boolean = false;
    let palette: PaletteColor[];

    // Client side length limit for the prompt. The server will also check this.
    $: {
        if ($form.prompt.length > 100) {
            $form.prompt = $form.prompt.slice(0, 100);
        }
    }
</script>

<div class="max-w-[550px] px-6 mt-20 flex flex-col mx-auto">
    <img src={logo} alt="Color chef" class="w-full" />
    <section class="mt-14">
        <p class="font-bold text-lg">How to use</p>
        <p class="font-medium text-lg">Generate a color palette by describing how it will be used. <br /> <span class="italic">The Chef</span> will do the rest, sick back and enjoy!</p>
    </section>
    <div class="mt-16">
        <form method="POST" use:enhance>
            <div class="flex flex-col gap-2">
                {#if showExamples}
                    <button type="button" on:click={() => (showExamples = false)} class="flex gap-1 items-center self-end text-amber-500 font-medium transition-all hover:text-amber-400 hover:cursor-pointer">Hide examples</button>
                    <div class="p-4 rounded-2xl border-amber-500 border-[3px] border-dashed text-amber-500 mb-4 mt-2">
                        <ul class="font-medium list-disc pl-4">
                            <li>Cozy painting vibes</li>
                            <li>Surprise party for someone who likes the military</li>
                            <li>Lord of the rings</li>
                        </ul>
                    </div>
                {:else}
                    <button type="button" on:click={() => (showExamples = true)} class="flex gap-1 items-center self-end text-amber-500 font-medium transition-all hover:text-amber-400 hover:cursor-pointer">Show examples <IconInfo /></button>
                {/if}

                <input
                    name="prompt"
                    placeholder="Beach wedding in Italy"
                    class="border-[3px] border-dark-brown rounded-2xl p-3 w-full text-lg text-center font-medium text-dark-brown transition-all hover:shadow-lg hover:-translate-y-[2px] focus-visible:outline-amber-300 outline-offset-4"
                    bind:value={$form.prompt}
                />
                <div class="flex items-center w-full justify-end gap-2">
                    {#if $errors.prompt}
                        <span class="font-medium text-red-600 flex-1">{$errors.prompt}</span>
                    {/if}
                    <span class="text-amber-500 font-medium text-sm">{$form.prompt.length}/100</span>
                </div>
            </div>
        </form>
    </div>
    {#if palette}
        <div class="mt-8">
            <Palette colors={palette} />
        </div>
    {/if}
    <footer class="font-medium flex justify-center items-center pb-8 pt-32">
        <p>A weekend project by <a href="https://maxmckinney.com" class="underline font-bold">Max McKinney</a></p>
    </footer>
</div>
