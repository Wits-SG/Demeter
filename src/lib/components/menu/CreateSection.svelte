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
	let sectionName: string;
	export let sectionID: number = 0;
	export let menuId: string = '';
	const createSection = async () => {
		await fetch('/api/menu/section', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				sectionID: sectionID,
				menuID: menuId,
				name: sectionName
			})
		});
	};
</script>

<button
	use:melt={$trigger}
	class="inline-flex justify-start items-start rounded-md px-10 py-1
  font-medium leading-none text-magnum-700 shadow hover:opacity-75"
	>+ Section
</button>

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
				Create New Section
			</h2>

			<fieldset class="mb-4 flex items-center gap-5">
				<label class="w-[90px] text-right text-emerald-600 font-bold" for="name">
					Section
				</label>
				<input
					class="inline-flex h-8 w-full flex-1 items-center justify-center
                      rounded-sm border border-solid px-3 leading-none text-black"
					id="name"
					placeholder="Mains"
					bind:value={sectionName} />
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
					on:click={createSection}
					use:melt={$close}
					class="inline-flex h-8 items-center rounded-sm
                      bg-emerald-100 px-4 font-medium leading-none text-emerald-700">
					Create
				</button>
			</div>
		</div>
	{/if}
</div>
