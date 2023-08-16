<script>
	import TopBar from '$lib/components/top_bar.svelte';
	import SideBar from '$lib/components/side_bar.svelte';
</script>

<main class="grid grid-rows-[max-content_1fr] grid-col-2 gap-y-0 gap-x-0 h-full w-full">
	<div class="w-full h-full row-start-1 row-end-1 col-start-1 col-span-2"><TopBar /></div>
	<nav class="h-full w-full row-start-2 row-span-6 col-start-1 col-span-1"><SideBar /></nav>
</main>

<slot />
