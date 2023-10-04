<script lang="ts">
    import { fade } from 'svelte/transition';
    import { flip } from 'svelte/animate';
    import logo from '$lib/assets/color-chef-logo.svg';
    import IconInfo from 'virtual:icons/ph/info-bold';
    import IconClose from 'virtual:icons/ph/x';
    import IconCookingPot from 'virtual:icons/ph/cooking-pot-bold';
    import IconCopy from 'virtual:icons/ph/clipboard-text-bold';
    import type { PageData } from './$types';
    import { superForm } from 'sveltekit-superforms/client';
    import Palette from '$lib/components/Palette.svelte';

    export let data: PageData;
    const { form, enhance, errors } = superForm(data.form, {
        applyAction: false,
        resetForm: true,
        async onResult({ result }) {
            if (result.type === 'success') {
                // Result the current palette
                fetchingPalette = true;

                // Fetch the palette from the server
                let res = await fetch(`/api/palette?prompt=${$form.prompt}`, {
                    method: 'GET'
                });

                let newPalette = await res.json();
                // Svelte doesn't rerender when you push to an array, so we need to create a new array with the new palette
                palettes = [newPalette, ...palettes];

                // Stop the loading animation
                fetchingPalette = false;
            }
        }
    });

    let showExamples: boolean = false;
    let fetchingPalette: boolean = false;
    let palettes: any[] = [];

    // Client side length limit for the prompt. The server will also check this.
    $: {
        if ($form.prompt.length > 100) {
            $form.prompt = $form.prompt.slice(0, 100);
        }
    }
</script>

<div class="max-w-[550px] px-6 mt-20 flex flex-col mx-auto">
    <div class="w-full flex justify-center">
        <img src={logo} alt="Color chef" class="w-full max-w-sm" />
    </div>
    <section class="mt-14 flex flex-col gap-4">
        <p class="font-bold text-lg">How to use</p>
        <span class="flex flex-row gap-2 items-start">
            <IconInfo style="font-size: 24px" />
            <p class="font-medium text-lg w-full">Generate a color palette by describing how it will be used. <span class="italic font-semibold">The Chef</span> will do the rest, sit back and enjoy!</p>
        </span>
        <span class="flex flex-row gap-2 items-center">
            <IconCopy style="font-size: 24px" />
            <p class="font-medium text-lg w-full">Click on a color to copy it’s hex value.</p>
        </span>
    </section>
    <div class="mt-16">
        <form method="POST" use:enhance>
            <div class="flex flex-col gap-2">
                {#if showExamples}
                    <button type="button" on:click={() => (showExamples = false)} class="flex gap-1 items-center self-end text-yellow-600 font-medium transition-all hover:text-yellow-500 hover:cursor-pointer focus-visible:outline-offset-2 focus-visible:outline-yellow-500"
                        >Hide examples <IconClose /></button
                    >
                    <div class="p-4 rounded-2xl border-yellow-600 border-[3px] border-dashed text-dark-brown mb-4 mt-2">
                        <ul class="font-medium list-disc pl-4">
                            <li>Cozy painting vibes</li>
                            <li>Surprise party for someone who likes the military</li>
                            <li>Lord of the rings</li>
                        </ul>
                    </div>
                {:else}
                    <button type="button" on:click={() => (showExamples = true)} class="flex gap-1 items-center self-end text-yellow-600 font-medium transition-all hover:text-yellow-500 hover:cursor-pointer focus-visible:outline-offset-2 focus-visible:outline-yellow-500"
                        >Show examples <IconInfo /></button
                    >
                {/if}

                <input
                    name="prompt"
                    placeholder="Beach wedding in Italy"
                    class="border-[3px] border-dark-brown rounded-2xl p-3 w-full text-lg text-center font-medium text-dark-brown transition-all hover:shadow-xl hover:shadow-orange-200/50 hover:-translate-y-[2px] focus:outline-0 focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                    bind:value={$form.prompt}
                />
                <div class="flex items-center w-full justify-end gap-2">
                    {#if $errors.prompt}
                        <span class="font-medium text-red-600 flex-1">{$errors.prompt}</span>
                    {/if}
                    <span class="text-dark-brown font-medium text-sm">{$form.prompt.length}/100</span>
                </div>
            </div>
        </form>
    </div>
    {#if fetchingPalette}
        <div class="mt-8">
            <div class="rounded-2xl w-full h-32 font-bold relative flex justify-center items-center overflow-hidden">
                <span class="absolute z-10 flex flex-row gap-2 items-center"><IconCookingPot /> Palette in the oven. Cooking...</span>
                <span class="bg-amber-300 w-full h-full animate-pulse-1" />
                <span class="bg-amber-300 w-full h-full animate-pulse-2" />
                <span class="bg-amber-300 w-full h-full animate-pulse-3" />
                <span class="bg-amber-300 w-full h-full animate-pulse-4" />
                <span class="bg-amber-300 w-full h-full animate-pulse-5" />
            </div>
        </div>
    {/if}
    <div class="mt-16 flex flex-col gap-8">
        {#each palettes as palette (palette)}
            <div in:fade={{ duration: 1000 }} animate:flip={{ duration: 700 }}>
                <Palette {palette} />
            </div>
        {/each}
    </div>
    <footer class="font-medium flex justify-center items-center pb-8 pt-32">
        <p>A weekend project by <a href="https://maxmckinney.com" class="underline font-medium text-yellow-600 transition-colors hover:text-yellow-500 focus-visible:outline-offset-2 focus-visible:outline-yellow-500">Max McKinney</a></p>
    </footer>
</div>
