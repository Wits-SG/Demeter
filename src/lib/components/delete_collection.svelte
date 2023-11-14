<script lang="ts">
	import { createDialog, melt } from '@melt-ui/svelte';
	import { Trash } from 'lucide-svelte';

	const {
		elements: { trigger, overlay, content, title, description, close, portalled },
		states: { open }
	} = createDialog({
		forceVisible: true
	});

	export let collection: string;
	export let handleDelete: () => Promise<void>;
</script>

<button
	use:melt={$trigger}
	class="w-full p-1 rounded-md flex flex-row justify-center items-center hover: dark:text-white text-black hover:bg-red-300 bg-red-400 border-2 border-red-600">
	<Trash />
</button>

<div use:melt={$portalled}>
	{#if $open}
		<div use:melt={$overlay} class="fixed inset-0 z-50 bg-black/50" />
		<div
			class="fixed left-[50%] top-[50%] z-50 max-h-[85vh] w-[90vw]
              max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-xl bg-white
              p-6 shadow-lg"
			use:melt={$content}>
			<h2 use:melt={$title} class=" text-lg font-medium text-black">Delete {collection}</h2>
			<p use:melt={$description} class="mb-5 mt-2 leading-normal text-zinc-600">
				Are you sure you want to delete this {collection}?
			</p>
			<!-- Add your delete logic here -->
			<div class="mt-6 flex justify-end gap-4">
				<button
					use:melt={$close}
					class="h-10 items-center justify-center flex flex-row gap-1 rounded-lg border-2 border-emerald-500 dark:bg-emerald-700 bg-emerald-100 p-2 dark:hover:bg-emerald-800 hover:bg-emerald-300">
					Cancel
				</button>

				<button
					on:click={async () => {
						$open = false;
						await handleDelete();
					}}
					class="h-10 items-center justify-center flex flex-row gap-1 rounded-lg border-2 border-emerald-500 dark:bg-emerald-700 bg-emerald-100 p-2 dark:hover:bg-emerald-800 hover:bg-emerald-300">
					Delete
				</button>
			</div>
		</div>
	{/if}
</div>
