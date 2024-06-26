<script lang="ts">
	import { createDialog, melt } from '@melt-ui/svelte';
	import { createEventDispatcher, onMount } from 'svelte';
	import { goto, invalidateAll } from '$app/navigation';
	import { userInfo } from '$lib/stores/user.store';

	let userId = $userInfo.userId;
	const dispatcher = createEventDispatcher();

	const {
		elements: { trigger, overlay, content, title, description, close, portalled },
		states: { open }
	} = createDialog({
		forceVisible: true
	});

	let inputName: string = '';
	let inputSection: string = '';
	let sectionList: Array<string> = [];
	let errorMessage = '';

	function handleAddSection() {
		if (inputSection.trim() === '') {
			errorMessage = 'Section name cannot be empty.';
		} else {
			errorMessage = '';
			dispatcher('addSection', { sectionName: inputSection });
			sectionList = [...sectionList, inputSection];
			inputSection = ''; // Clear the input field
		}
	}

	function handleCreateMenu() {
		const titleIsEmpty = inputName.trim() === '';
		const sectionsAreEmpty = sectionList.length === 0;

		if (titleIsEmpty && sectionsAreEmpty) {
			errorMessage = 'Title and sections cannot be empty.';
		} else if (titleIsEmpty) {
			errorMessage = 'Title cannot be empty.';
		} else if (sectionsAreEmpty) {
			errorMessage = 'You cannot create a menu with no sections.';
		} else {
			postMenu();
			open.set(false);
			errorMessage = '';

			// Clear input boxes and text areas
			inputSection = '';
			sectionList = [];
			inputName = '';
		}
	}

	function handleCancel() {
		inputSection = '';
		sectionList = [];
		errorMessage = '';
		inputName = '';
	}

	async function postMenu() {
		const response = await fetch('/api/menu', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name: inputName,
				userID: userId,
				sections: sectionList
			})
		});
	}

	// onMount(() => {
	// 	const interval = setInterval(() => {
	// 		invalidateAll();
	// 	}, 1000);

	// 	return () => {
	// 		clearInterval(interval);
	// 	};
	// });
</script>

<button
	use:melt={$trigger}
	class="rounded-md border-2 w-32 h-40 border-emerald-700 text-4xl text-emerald-700 dark:text-emerald-200 dark:border-emerald-700 text-center">
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
			<h2 use:melt={$title} class="text-xl font-bold text-emerald-700 text-center">
				Create a Menu
			</h2>
			<p use:melt={$description} class="mb-5 mt-2 leading-normal text-zinc-600">
				Create a menu by typing in the Title and Section names. Then press 'Add Section'. To
				finalise press 'Create Menu'.
			</p>

			<fieldset class="mb-4 flex items-center gap-5">
				<label class="w-[90px] text-right text-emerald-600 font-bold" for="title">
					Title
				</label>
				<input
					class="inline-flex h-8 w-full flex-1 items-center justify-center
                      rounded-sm border border-solid px-3 leading-none text-black"
					id="title"
					bind:value={inputName} />
			</fieldset>

			<fieldset class="mb-4 flex items-center gap-5">
				<label class="w-[90px] text-right text-emerald-600 font-bold" for="section">
					Section
				</label>
				<input
					class="inline-flex h-8 w-full flex-1 items-center justify-center
                      rounded-sm border border-solid px-3 leading-none text-black"
					id="section"
					bind:value={inputSection} />
			</fieldset>

			{#if errorMessage}
				<p class="text-red-600">{errorMessage}</p>
			{/if}

			<div class="flex items-start justify-start gap-10 pl-10">
				<ul class="list-disc list-inside">
					{#if sectionList.length != 0}
						{#each sectionList as section}
							<li class="mb-2 text-zinc-900">
								{section}
							</li>
						{/each}
					{/if}
				</ul>
			</div>

			<div class="mt-6 flex justify-end gap-4">
				<button
					on:click={handleAddSection}
					class="inline-flex h-8 items-center justify-center rounded-sm
            bg-teal-600 px-4 font-medium leading-none text-zinc-50 hover:bg-emerald-600">
					Add Section
				</button>
			</div>

			<div class="mt-6 flex justify-end gap-4">
				<button
					on:click={handleCancel}
					use:melt={$close}
					class="inline-flex h-8 items-center justify-center rounded-sm
            bg-teal-600 px-4 font-medium leading-none text-zinc-50 hover:bg-emerald-600">
					Cancel
				</button>

				<button
					on:click={handleCreateMenu}
					class="inline-flex h-8 items-center justify-center rounded-sm
            bg-teal-600 px-4 font-medium leading-none text-zinc-50 hover:bg-emerald-600">
					Create Menu
				</button>
			</div>
		</div>
	{/if}
</div>
