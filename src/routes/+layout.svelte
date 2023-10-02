<script lang="ts">
    import '$lib/app.css';
    import { Toaster } from 'svelte-french-toast';
</script>

<svelte:head>
    <title>Color Chef - AI Generative Color Palettes</title>
    <meta name="description" content="Generate a color palette by describing how it will be used. The Chef will do the rest, sit back and enjoy!" />
    <meta property="og:title" content="Color Chef - AI Generative Color Palettes" />
    <meta property="og:type" content="website" />
    <meta property="og:description" content="Generate a color palette by describing how it will be used. The Chef will do the rest, sit back and enjoy!" />
    <meta property="og:image" content="https://colorchef.app/color-chef-openg-image.png" />
</svelte:head>

<slot />

<Toaster toastOptions={{ style: 'border: 3px solid #3A300A; color: #3A300A;' }} />
