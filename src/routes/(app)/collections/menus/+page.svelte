<script lang="ts">
	import { Plus, Trash, Pen, Save, X, MenuSquare } from 'lucide-svelte';
	import type { PageData } from './$types';
	//@ts-ignore
	import { v4 as uuid } from 'uuid';

	export let data: PageData;
	let menus = data.menus;

	let currentMenu: Menu =
		menus.length > 0
			? menus[0]
			: ({
					menuID: 'NONE',
					name: 'No Menu',
					description: 'No Description',
					sections: [] as Array<string>
			  } as Menu);
	let uneditedMenu: Menu = currentMenu;

	let editMenu: boolean = false;
</script>

<div class="w-full h-fit max-h-[95vh] flex flex-col gap-4 p-5">
	<div class="w-full h-44 flex flex-row gap-2">
		<button
			on:click={async () => {
				//@ts-ignore
				currentMenu = {
					menuID: uuid(),
					name: 'New Menu',
					description: '',
					userID: data.userId ? data.userId : '',
					sections: []
				};
				menus.push(currentMenu);
				editMenu = true;

				await fetch('/api/menu', {
					method: 'POST',
					body: JSON.stringify(currentMenu)
				});
			}}
			class="w-1/5 h-full rounded-md border-2 border-amber-500 hover:bg-neutral-200 dark:hover:bg-neutral-900 flex justify-center items-center">
			<Plus size={32} />
		</button>
		<div class="w-1 h-full rounded-lg bg-emerald-400" />
		<section class="w-full flex flex-col gap-2">
			{#if !editMenu}
				<div class="w-full flex flex-row justify-start items-start gap-10">
					<section class="w-1/3 h-44 overflow-y-auto">
						<h2 class="text-xl">{currentMenu.name}</h2>
						<p class="text-md w-full overflow-y-auto">{currentMenu.description}</p>
					</section>

					<section
						class="w-1/6 h-44 flex flex-col justify-start items-start overflow-y-auto gap-2">
						<h2 class="text-lg sticky top-0 w-full dark:bg-zinc-800 bg-zinc-100">
							Sections
						</h2>
						{#each currentMenu.sections as s}
							<p class="text-center w-full p-1 border-amber-500 border-b-2">
								{s}
							</p>
						{/each}
					</section>
				</div>
			{:else}
				<div class="w-full h-full flex flex-col gap-2">
					<section
						class="w-full h-full flex flex-row justify-start items-start gap-4 min-w-fit">
						<span class="w-1/4 flex flex-col justify-start items-start gap-2">
							<label for="menu-title" class="text-xl p-1">Menu Title</label>
							<input
								bind:value={currentMenu.name}
								name="menu-title"
								class="text-md h-8 w-full rounded-md outline-none border-2 border-white hover:border-emerald-500 text-black px-1" />
						</span>

						<span class="flex flex-col w-1/4 justify-start items-start gap-2">
							<label for="menu-description" class="text-xl p-1"
								>Menu Description</label>
							<textarea
								rows="3"
								bind:value={currentMenu.description}
								name="menu-description"
								class="text-md w-full h-fit rounded-md outline-none border-2 border-white hover:border-emerald-500 text-black px-1" />
						</span>
					</section>

					<span class="flex flex-row justify-start items-start gap-2">
						<button
							on:click={async () => {
								editMenu = false;
								menus = menus; // force a redraw of the table with the new title

								await fetch('/api/menu', {
									method: 'PUT',
									body: JSON.stringify(currentMenu)
								});
							}}
							class="items-center justify-center flex flex-row rounded-lg border-2 border-emerald-500 dark:bg-emerald-700 bg-emerald-100 p-1 dark:hover:bg-emerald-800 hover:bg-emerald-300"
							><Save /></button>
						<button
							on:click={() => {
								currentMenu = uneditedMenu;
								editMenu = false;
							}}
							class="p-1 rounded-md flex flex-row justify-center items-center hover: dark:text-white text-black hover:bg-red-300 bg-red-400 border-2 border-red-600"
							><X /></button>
					</span>
				</div>
			{/if}
		</section>
	</div>

	<div
		class="w-full border-y-2 dark:border-neutral-600 border-neutral-200 py-2 flex flex-row items-center justify-start gap-3">
		<!-- <button class="w-fit h-fit"><LayoutGrid size={28} /></button>
        <button class="w-fit h-fit"><LayoutList size={28} /></button> -->
	</div>

	<div class="w-full p-2 max-h-[60vh] overflow-y-auto">
		<table class="w-full">
			<tbody>
				{#each menus as m, i}
					<tr
						class="h-10 dark:hover:bg-neutral-900 hover:bg-neutral-200 cursor-pointer border-l-2 border-amber-500">
						<td
							class="pl-2"
							on:click={() => {
								currentMenu = m;
								uneditedMenu = m;
							}}>{m.name}</td>
						<td class="w-10 p-1">
							<button
								on:click={async () => {
									menus.splice(i, 1);
									menus = menus;

									await fetch('/api/menu', {
										method: 'DELETE',
										body: JSON.stringify({ menuId: m.menuID })
									});
								}}
								class="w-full p-1 rounded-md flex flex-row justify-center items-center hover: dark:text-white text-black hover:bg-red-300 bg-red-400 border-2 border-red-600">
								<Trash />
							</button>
						</td>
						<td class="w-10 p-1">
							<button
								on:click={() => {
									editMenu = true;
									uneditedMenu = currentMenu;
								}}
								class="w-full items-center justify-center flex flex-row rounded-lg border-2 border-emerald-500 dark:bg-emerald-700 bg-emerald-100 p-1 dark:hover:bg-emerald-800 hover:bg-emerald-300">
								<Pen />
							</button>
						</td>
						<td class="w-20">
							<a
								href="/menu/{m.menuID}"
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
