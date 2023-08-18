<script>
	import TopBar from '$lib/components/top_bar.svelte';
	import SideBar from '$lib/components/side_bar.svelte';

	let sidebar_open = false;
	let colgrid_template = '1fr 9fr';
	$: colgrid_template = sidebar_open ? '1fr 6fr' : '80px 10fr';
</script>

<main
	class="grid grid-rows-[80px_8fr] h-full w-full overflow-x-hidden"
	style="grid-template-columns: {colgrid_template};">
	<div class="row-start-1 col-start-1 row-span-1 col-span-2 sticky"><TopBar /></div>
	<!-- <div class="row-start-1 col-start-2 row-span-1 col-span-1 bg-blue-500"></div> -->
	<div class="row-start-2 col-start-1 row-span-1 col-span-1">
		<SideBar bind:open={sidebar_open} />
	</div>
	<div class="row-start-2 col-start-2 row-span-1 col-span-1"><slot /></div>
</main>
