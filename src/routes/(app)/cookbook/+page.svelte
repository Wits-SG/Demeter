<script lang="ts">
	import CreateCookbook from '$lib/components/cookbooks/createCookbook.svelte';
	import type { PageData } from './$types';
	import CreateMenu from '$lib/components/menu/CreateMenu.svelte';

	import { createSeparator, type CreateSeparatorProps, melt } from '@melt-ui/svelte';
	export let data: PageData;
	$: console.log(data);

	export let orientation: CreateSeparatorProps['orientation'] = 'horizontal';

	const {
		elements: { root: horizontal }
	} = createSeparator({
		orientation
	});
</script>

<div class=" flex flex-col h-screen w-screen justify-center items-center gap-2">
	<div class="flex flex-col gap-5 w-full h-1/2 justify-center">
		<div>
			<h1 class="text-3xl items-start px-5">COOKBOOKS</h1>
		</div>

		<div class="px-10 flex flex-row align-center h-full w-full items-center gap-10">
			<button
				class="rounded-md border-2 w-32 h-40 text-4xl text-emerald-700 border-emerald-700 dark:text-emerald-300 darkborder-emerald-300"
				><CreateCookbook /></button>
			<div class="flex flex-row items-center gap-10 text-center h-full w-auto">
				{#each data.cookbooks as cookbook}
					<a
						class="flex justify-center items-center text-black h-1/2 w-full bg-contain"
						style="background-image: url('/src/lib/assets/images/cookbook.jpeg')"
						href="/cookbook/{cookbook.id}">{cookbook.name}</a>
				{/each}
			</div>
		</div>
	</div>
	<div use:melt={$horizontal} class="w-11/12 h-[3px] bg-emerald-700" />

	<div class="flex flex-col gap-10 w-full h-1/2 justify-center">
		<div class="flex flex-col">
			<h1 class="text-3xl items-start px-5">MENUS</h1>
			<div class="px-10 flex flex-row align-center h-full w-full items-center gap-10">
				<div>
					<CreateMenu />
				</div>
				<div class="flex flex-row items-center gap-10 text-center h-full w-auto">
					{#each data.menus as menu}
						<!-- <button
						class="rounded-md border-2 w-32 h-40 border-emerald-700 text-xl text-emerald-700 dark:text-emerald-300 dark:border-emerald-300"
						>{menu.name}</button> -->

						<a
							class="flex justify-center items-center text-black w-32 h-48 bg-contain"
							style="background-image: url('/src/lib/assets/images/cookbook_cover_image.jpeg')"
							href="/cookbook/{menu.menuID}">{menu.name}</a>
					{/each}
				</div>
			</div>
		</div>
	</div>
</div>
