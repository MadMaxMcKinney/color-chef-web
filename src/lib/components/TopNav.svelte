<script>
    import Container from '$lib/components/TopNav.svelte';
    import logo from '$lib/assets/color-cauldron.svg';
</script>

<div class="py-4 px-6">
    <Container>
        <div class="flex justify-between">
            <div>
                <a href="/" class="flex flex-row items-center text-xl font-bold">
                    <img src={logo} alt="Black cauldron with a green light shining out the top with green bubbles" class="w-5 h-auto" /> Color Cauldron
                </a>
            </div>
        </div>
    </Container>
</div>
