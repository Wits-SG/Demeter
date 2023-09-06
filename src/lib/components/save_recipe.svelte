<script lang="ts">
	import { createDialog, melt } from '@melt-ui/svelte';
	import { createCombobox, type ComboboxFilterFunction } from '@melt-ui/svelte';

	interface Cookbook {
		title: string;
		disabled: boolean;
	}

	let cookbooks: Cookbook[] = [
		{
			title: 'Cookbook 1',
			disabled: false
		},
		{
			title: 'Cookbook 2',
			disabled: false
		},
		{
			title: 'Cookbook 3',
			disabled: false
		}
	];

	//     const filterFunction: ComboboxFilterFunction<Cookbook> = ({
	//     itemValue,
	//     input,
	//   }) => {
	//     // Example string normalization function. Replace as needed.
	//     const normalize = (str: string) => str.normalize().toLowerCase();
	//     const normalizedInput = normalize(input);
	//     return (
	//       normalizedInput === '' ||
	//       normalize(itemValue.title).includes(normalizedInput)
	//     );
	//   };

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

			<div class="mt-6 flex justify-end gap-4">
				<button
					use:melt={$close}
					class="inline-flex h-8 items-center justify-center rounded-sm
                      bg-zinc-100 px-4 font-medium leading-none text-zinc-600">
					Cancel
				</button>
				<button
					use:melt={$close}
					class="inline-flex h-8 items-center justify-center rounded-sm
                    bg-zinc-100 px-4 font-medium leading-none text-zinc-600">
					Save
				</button>
			</div>
		</div>
	{/if}
</div>
