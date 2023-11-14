<script lang="ts">
	import { Plus, Trash, Pen, Save, X } from 'lucide-svelte';
	import type { PageData } from './$types';
	//@ts-ignore
	import { v4 as uuid } from 'uuid';
	import DeleteCollection from '$lib/components/delete_collection.svelte';

	export let data: PageData;

	let cookbooks: Array<Cookbook> = data.cookbooks;
	let currentCookbook: Cookbook =
		cookbooks.length > 0
			? cookbooks[0]
			: ({
					id: 'NONE',
					name: 'No Cookbook',
					description: ''
			  } as Cookbook);

	let editCookbook: boolean = false;
	let uneditedCookbook: Cookbook = currentCookbook;
</script>

<div class="w-full h-fit max-h-[95vh] overflow-y-auto flex flex-col gap-4 p-5">
	<div class="w-full h-44 flex flex-row gap-2">
		<button
			on:click={async () => {
				currentCookbook = {
					id: uuid(),
					name: 'New Cookbook',
					description: '',
					userID: data.userId ? data.userId : ''
				};
				cookbooks.push(currentCookbook);
				editCookbook = true;

				await fetch('/api/cookbook', {
					method: 'POST',
					body: JSON.stringify(currentCookbook)
				});
			}}
			class="w-1/5 h-full rounded-md border-2 border-cyan-300 flex justify-center items-center">
			<Plus size={32} />
		</button>
		<div class="w-1 h-full rounded-lg bg-emerald-400" />
		<div class="w-full flex flex-col jusitify-start items-start gap-10">
			{#if !editCookbook}
				<section class="flex flex-col justify-start items-start gap-2">
					<h2 class="text-xl">{currentCookbook.name}</h2>
					<p class="text-md w-full overflow-y-auto">{currentCookbook.description}</p>
				</section>
			{:else}
				<div class="w-full h-full flex flex-col gap-2">
					<section
						class="w-full h-full flex flex-row justify-start items-start gap-4 min-w-fit">
						<span class="w-1/4 flex flex-col justify-start items-start gap-2">
							<label for="cookbook-title" class="text-xl p-1">Cookbook Title</label>
							<input
								bind:value={currentCookbook.name}
								name="cookbook-title"
								class="text-md h-8 w-full rounded-md outline-none border-2 border-white hover:border-emerald-500 text-black px-1" />
						</span>

						<span class="flex flex-col w-1/4 justify-start items-start gap-2">
							<label for="cookbook-description" class="text-xl p-1"
								>Cookbook Description</label>
							<textarea
								rows="3"
								bind:value={currentCookbook.description}
								name="menu-description"
								class="text-md w-full h-fit rounded-md outline-none border-2 border-white hover:border-emerald-500 text-black px-1" />
						</span>
					</section>

					<span class="flex flex-row justify-start items-start gap-2">
						<button
							on:click={async () => {
								editCookbook = false;
								cookbooks = cookbooks; // force a redraw of the table with the new title

								await fetch('/api/cookbook', {
									method: 'PUT',
									body: JSON.stringify(currentCookbook)
								});
							}}
							class="items-center justify-center flex flex-row rounded-lg border-2 border-emerald-500 dark:bg-emerald-700 bg-emerald-100 p-1 dark:hover:bg-emerald-800 hover:bg-emerald-300"
							><Save /></button>
						<button
							on:click={() => {
								currentCookbook = uneditedCookbook;
								editCookbook = false;
							}}
							class="p-1 rounded-md flex flex-row justify-center items-center hover: dark:text-white text-black hover:bg-red-300 bg-red-400 border-2 border-red-600"
							><X /></button>
					</span>
				</div>
			{/if}
		</div>
	</div>

	<div
		class="w-full border-y-2 dark:border-neutral-600 border-neutral-200 py-2 flex flex-row items-center justify-start gap-3" />

	<div class="w-full p-2 max-h-[60vh] overflow-y-auto">
		<table class="w-full">
			<tbody>
				{#each cookbooks as c, i}
					<tr
						class="h-10 dark:hover:bg-neutral-900 hover:bg-neutral-200 cursor-pointer border-l-2 border-cyan-500">
						<td
							class="pl-2"
							on:click={() => {
								currentCookbook = c;
								uneditedCookbook = c;
							}}>{c.name}</td>
						<td class="w-10 p-1">
							<DeleteCollection
								collection="Cookbook"
								handleDelete={async () => {
									cookbooks.splice(i, 1);
									cookbooks = cookbooks;

									await fetch('/api/cookbook', {
										method: 'DELETE',
										body: JSON.stringify({ cookbookId: c.id })
									});
								}} />
						</td>
						<td class="w-10 p-1">
							<button
								on:click={() => {
									editCookbook = true;
									uneditedCookbook = currentCookbook;
								}}
								class="w-full items-center justify-center flex flex-row rounded-lg border-2 border-emerald-500 dark:bg-emerald-700 bg-emerald-100 p-1 dark:hover:bg-emerald-800 hover:bg-emerald-300">
								<Pen />
							</button>
						</td>
						<td class="w-20">
							<a
								href="/cookbook/{c.id}"
								class="w-full items-center justify-center flex flex-row rounded-lg border-2 border-emerald-500 dark:bg-emerald-700 bg-emerald-100 p-1 dark:hover:bg-emerald-800 hover:bg-emerald-300">
								View
							</a>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
