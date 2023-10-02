<script lang="ts">
    import '$lib/app.css';
    import { Toaster } from 'svelte-french-toast';
</script>

<svelte:head>
    <title>Color Chef</title>
    <meta name="description" content="Generate a color palette by describing how it will be used. The Chef will do the rest, sit back and enjoy!" />
</svelte:head>

<slot />

<Toaster toastOptions={{ style: 'border: 3px solid #3A300A; color: #3A300A;' }} />
