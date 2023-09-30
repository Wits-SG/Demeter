<script lang="ts">
	import { onMount } from 'svelte';
	import { createDialog, melt } from '@melt-ui/svelte';

	const {
		elements: { trigger, overlay, content, title, description, close, portalled },
		states: { open }
	} = createDialog({
		forceVisible: true
	});
</script>

<button
	use:melt={$trigger}
	class="inline-flex items-center justify-center rounded-xl bg-emerald-700 px-4 py-3
    leading-none text-white shadow hover:opacity-75">
	Recipe of the Day
</button>

<div use:melt={$portalled}>
	{#if $open}
		<div use:melt={$overlay} class="fixed inset-0 z-50 bg-black/50" />
		<div
			class="fixed left-[50%] top-[50%] z-50 max-h-[85vh] w-[90vw]
              max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-xl bg-white
              p-6 shadow-lg flex flex-col justify-center items-center"
			use:melt={$content}>
			<h2 use:melt={$title} class="text-3xl font-medium text-black">Recipe of the Day</h2>

			<section class="flex flex-row justify-center items-center gap-10">
				<div class="flex flex-col justify-center items-center" />
				<div class="flex flex-col justify-center items-center" />
			</section>

			<div class="mt-6 flex justify-end gap-4">
				<button
					use:melt={$close}
					class="inline-flex h-8 items-center justify-center rounded-sm
                      bg-teal-600 px-4 font-medium leading-none text-zinc-50 hover:bg-emerald-600">
					Cancel
				</button>
			</div>
		</div>
	{/if}
</div>
