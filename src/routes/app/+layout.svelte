<script>
	import TopBar from '$lib/components/top_bar.svelte';
	import SideBar from '$lib/components/side_bar.svelte';
</script>

<main class="flex flex-col h-[98vh] max-w-screen">
	<div class="flex">
		<TopBar />
	</div>
	<nav class="flex h-full"><SideBar /></nav>
</main>

<slot />
