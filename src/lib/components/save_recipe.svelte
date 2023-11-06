<script lang="ts">
	import { createDialog, melt } from '@melt-ui/svelte';
	import SelectCookbook from './cookbooks/SelectCookbook.svelte';
	import { Save } from 'lucide-svelte';

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

	let recipeExistsInCookbook = false;
</script>

<button
	use:melt={$trigger}
	class="w-48 items-center justify-center flex flex-row gap-1 rounded-lg border-2 border-emerald-500 dark:bg-emerald-700 bg-emerald-100 p-2 dark:hover:bg-emerald-800 hover:bg-emerald-300">
	<Save /> Save Recipe
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
					class="h-10 items-center justify-center flex flex-row gap-1 rounded-lg border-2 border-emerald-500 dark:bg-emerald-700 bg-emerald-100 p-2 dark:hover:bg-emerald-800 hover:bg-emerald-300">
					Cancel
				</button>
				<button
					on:click={async () => {
						// Check if the recipe already exists in the selected cookbook
						const response = await fetch('/api/cookbook/recipe/check', {
							method: 'POST',
							headers: {
								'Content-Type': 'application/json'
							},
							body: JSON.stringify({
								recipeId: recipeID,
								cookbookId: selectedCookbook.cookbook_id
							})
						});

						if (response.ok) {
							const data = await response.json();
							if (data.exists) {
								// Recipe already exists in the cookbook, show an alert
								alert('Recipe already exists in this cookbook.');
							} else {
								// Recipe doesn't exist, proceed to save it
								await fetch('/api/cookbook/recipe', {
									method: 'POST',
									headers: {
										'Content-Type': 'application/json'
									},
									body: JSON.stringify({
										recipeId: recipeID,
										cookbookId: selectedCookbook.cookbook_id
									})
								});
							}
						} else {
							// Handle the API error as needed
							console.error('API error:', response.statusText);
						}
					}}
					use:melt={$close}
					class="h-10 items-center justify-center flex flex-row gap-1 rounded-lg border-2 border-emerald-500 dark:bg-emerald-700 bg-emerald-100 p-2 dark:hover:bg-emerald-800 hover:bg-emerald-300">
					Save
				</button>
			</div>
		</div>
	{/if}
</div>
