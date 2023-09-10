<script lang="ts">
	import { createDialog, melt } from '@melt-ui/svelte';
	import type { stringify } from 'postcss';
	import { onMount } from 'svelte';
	//@ts-ignore
	import { v4 as uuidv4 } from 'uuid';

	const {
		elements: { trigger, overlay, content, title, description, close, portalled },
		states: { open }
	} = createDialog({
		forceVisible: true
	});

	let cookbooks: Array<{ name: string; cookbook_id: string }> = [];
	let cookbookTitle: string;
	const cookbookID = uuidv4();

	const createCookbook = async () => {
		await fetch('/api/cookbook/create', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				cookbookID: cookbookID,
				name: cookbookTitle
			})
		});
	};
</script>

<!-- Add button on cookbook main page -->
<button
	use:melt={$trigger}
	class="inline-flex items-center justify-center rounded-xl px-4 py-3
  font-medium leading-none text-magnum-700 shadow hover:opacity-75">+</button>

<!--  -->
<div use:melt={$portalled}>
	{#if $open}
		<div use:melt={$overlay} class="fixed inset-0 z-50 bg-black/50" />
		<div
			class="fixed left-[50%] top-[50%] z-50 max-h-[85vh] w-[90vw]
              max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-xl bg-white
              p-6 shadow-lg"
			use:melt={$content}>
			<h2 use:melt={$title} class="m-0 text-xl font-bold text-emerald-700 text-center">
				Create New Cookbook
			</h2>
			<p use:melt={$description} class="mb-5 mt-2 leading-normal text-zinc-600">
				Create new cookbook to save your recipes to.
			</p>

			<fieldset class="mb-4 flex items-center gap-5">
				<label class="w-[90px] text-right text-emerald-600 font-bold" for="name">
					Title
				</label>
				<input
					class="inline-flex h-8 w-full flex-1 items-center justify-center
                      rounded-sm border border-solid px-3 leading-none text-black"
					id="name"
					placeholder="Ashlea's Cookbook"
					bind:value={cookbookTitle} />
			</fieldset>
			<div class="mt-6 flex justify-end gap-4">
				<!-- Cancel Button -->
				<button
					use:melt={$close}
					class="inline-flex h-8 items-center justify-center rounded-sm
                      bg-zinc-100 px-4 font-medium leading-none text-black">
					Cancel
				</button>
				<!-- Create Button-->
				<button
					on:click={createCookbook}
					use:melt={$close}
					class="inline-flex h-8 items-center rounded-sm
                      bg-emerald-100 px-4 font-medium leading-none text-emerald-700">
					Create
				</button>
			</div>
			<!-- <button
          use:melt={$close}
          aria-label="close"
          class="absolute right-4 top-4 inline-flex h-6 w-6 appearance-none
                  items-center justify-center rounded-full p-1 text-magnum-800
                  hover:bg-magnum-100 focus:shadow-magnum-400"
        >X
        </button> -->
		</div>
	{/if}
</div>
