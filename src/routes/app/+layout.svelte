<script>
	import TopBar from '$lib/components/top_bar.svelte';
</script>

<main class="grid grid-rows-1 w-full h-full">
	<div class="flex flex-row justify-around">
		<TopBar />
	</div>
</main>

<slot />
