<script lang="ts">
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
	class="rounded-md border-2 w-32 h-32 border-emerald-700 text-4xl text-emerald-700 dark:text-emerald-300 dark:border-emerald-300 text-center">
	+
</button>

<div use:melt={$portalled}>
	{#if $open}
		<div use:melt={$overlay} class="fixed inset-0 z-50 bg-black/50" />
		<div
			class="fixed left-[50%] top-[50%] z-50 max-h-[100vh] w-[100vw]
              max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-xl bg-white
              p-6 shadow-lg"
			use:melt={$content}>
			<h2 use:melt={$title} class="text-lg font-medium text-black">Create a Menu</h2>
			<p use:melt={$description} class="mb-5 mt-2 leading-normal text-zinc-600">
				Create a menu by typing in the Title and Section names. Then using the dropdown
				select which recipes you would like to add to the section and then press 'Add
				Section'.
			</p>

			<fieldset class="mb-4 flex items-center gap-5">
				<label class="w-[90px] text-right text-black" for="title"> Title </label>
				<input
					class="inline-flex h-8 w-full flex-1 items-center justify-center
                      rounded-sm border border-solid px-3 leading-none text-black"
					id="title"
					value="" />
			</fieldset>

			<fieldset class="mb-4 flex items-center gap-5">
				<label class="w-[90px] text-right text-black" for="section"> Section </label>
				<input
					class="inline-flex h-8 w-full flex-1 items-center justify-center
                      rounded-sm border border-solid px-3 leading-none text-black"
					id="section"
					value="" />
			</fieldset>

			<div class="mt-6 flex justify-end gap-4">
				<button
					use:melt={$close}
					class="inline-flex h-8 items-center justify-center rounded-sm
            bg-teal-600 px-4 font-medium leading-none text-zinc-50 hover:bg-emerald-600">
					Add Section
				</button>
			</div>

			<div class="mt-6 flex justify-end gap-4">
				<button
					use:melt={$close}
					class="inline-flex h-8 items-center justify-center rounded-sm
            bg-teal-600 px-4 font-medium leading-none text-zinc-50 hover:bg-emerald-600">
					Cancel
				</button>

				<button
					use:melt={$close}
					class="inline-flex h-8 items-center justify-center rounded-sm
            bg-teal-600 px-4 font-medium leading-none text-zinc-50 hover:bg-emerald-600">
					Create Menu
				</button>
			</div>
		</div>
	{/if}
</div>
