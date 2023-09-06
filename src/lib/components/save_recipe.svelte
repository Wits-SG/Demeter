<script lang="ts">
	import { createDialog, melt } from '@melt-ui/svelte';
	import SelectCookbook from './cookbooks/SelectCookbook.svelte';

	export let recipeID: string = '';
	let selectedCookbook: { name: string; cookbook_id: string } = {
		name: '',
		cookbook_id: ''
	};

	const {
		elements: { trigger, overlay, content, title, description, close, portalled },
		states: { open }
	} = createDialog({
		forceVisible: true
	});
</script>

<button
	use:melt={$trigger}
	class="inline-flex items-center justify-center rounded-xl bg-teal-600 px-4 py-3
    font-medium leading-none text-zinc-50 shadow hover:opacity-75">
	Save Recipe
</button>

<div use:melt={$portalled}>
	{#if $open}
		<div use:melt={$overlay} class="fixed inset-0 z-50 bg-black/50" />
		<div
			class="fixed left-[50%] top-[50%] z-50 max-h-[85vh] w-[90vw]
              max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-xl bg-white
              p-6 shadow-lg"
			use:melt={$content}>
			<h2 use:melt={$title} class=" text-lg font-medium text-black">Select a Cookbook.</h2>
			<p use:melt={$description} class="mb-5 mt-2 leading-normal text-zinc-600">
				Choose the appropriate Cookbook that you would like to save this recipe in.
			</p>
			<SelectCookbook bind:selectedCookbook />
			<div class="mt-6 flex justify-end gap-4">
				<button
					use:melt={$close}
					class="inline-flex h-8 items-center justify-center rounded-sm
                      bg-zinc-100 px-4 font-medium leading-none text-zinc-600">
					Cancel
				</button>
				<button
					on:click={async () => {
						await fetch('/api/cookbook/add', {
							method: 'POST',
							headers: {
								'Content-Type': 'application/json'
							},
							body: JSON.stringify({
								recipeId: recipeID,
								cookbookId: selectedCookbook.cookbook_id
							})
						});
					}}
					use:melt={$close}
					class="inline-flex h-8 items-center justify-center rounded-sm
                    bg-zinc-100 px-4 font-medium leading-none text-zinc-600">
					Save
				</button>
			</div>
		</div>
	{/if}
</div>
