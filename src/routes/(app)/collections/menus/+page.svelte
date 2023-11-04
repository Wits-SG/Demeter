<script lang="ts">
	import { Plus, Trash, Pen, Save, X, MenuSquare } from 'lucide-svelte';

	let menus = [
		{
			name: 'Menu 1',
			description:
				'This is a menu with a very large description. The intent is that each description holds some cool info'
		},
		{
			name: 'Menu 2',
			description:
				'This is a menu with a very large description. The intent is that each description holds some cool info'
		}
		// { name: 'Menu 3', description: 'This is a menu with a very large description. The intent is that each description holds some cool info' },
		// { name: 'Menu 4', description: 'This is a menu with a very large description. The intent is that each description holds some cool info' },
		// { name: 'Menu 5', description: 'This is a menu with a very large description. The intent is that each description holds some cool info' },
		// { name: 'Menu 6', description: 'This is a menu with a very large description. The intent is that each description holds some cool info' },
		// { name: 'Menu 7', description: 'This is a menu with a very large description. The intent is that each description holds some cool info' },
		// { name: 'Menu 8', description: 'This is a menu with a very large description. The intent is that each description holds some cool info' },
		// { name: 'Menu 9', description: 'This is a menu with a very large description. The intent is that each description holds some cool info' },
		// { name: 'Menu 10', description: 'This is a menu with a very large description. The intent is that each description holds some cool info' },
		// { name: 'Menu 11', description: 'This is a menu with a very large description. The intent is that each description holds some cool info' },
		// { name: 'Menu 12', description: 'This is a menu with a very large description. The intent is that each description holds some cool info' },
		// { name: 'Menu 13', description: 'This is a menu with a very large description. The intent is that each description holds some cool info' },
		// { name: 'Menu 14', description: 'This is a menu with a very large description. The intent is that each description holds some cool info' },
		// { name: 'Menu 15', description: 'This is a menu with a very large description. The intent is that each description holds some cool info' },
	];

	const recentMenus: Array<{ name: string }> = [];
	// TEMP CODE
	for (let i = 0; i < 5; ++i) {
		const random = Math.floor(Math.random() * menus.length);
		recentMenus.push(menus[random]);
	}
	// TEMP CODE END

	let currentMenu: { name: string; description: string } =
		menus.length > 0 ? menus[0] : { name: 'No Menu', description: 'No Description' };
	let uneditedMenu: { name: string; description: string } = currentMenu;

	let editMenu: boolean = false;
</script>

<div class="w-full h-fit max-h-[95vh] flex flex-col gap-4 p-5">
	<div class="w-full h-44 flex flex-row gap-2">
		<button
			on:click={() => {
				currentMenu = { name: 'New Menu', description: '' };
				menus.push(currentMenu);
				editMenu = true;
			}}
			class="w-1/5 h-full rounded-md border-2 border-amber-500 hover:bg-neutral-200 dark:hover:bg-neutral-900 flex justify-center items-center">
			<Plus size={32} />
		</button>
		<div class="w-1 h-full rounded-lg bg-emerald-400" />
		<section class="w-full flex flex-col gap-2">
			{#if !editMenu}
				<h2 class="text-xl">{currentMenu.name}</h2>
				<p class="text-md w-1/3">{currentMenu.description}</p>
			{:else}
				<div class="w-full h-full flex flex-col gap-2">
					<section class="w-full h-full flex flex-row justify-center items-start">
						<span class="w-1/3 flex flex-col justify-start items-start gap-2">
							<label for="menu-title" class="text-xl p-1">Menu Title</label>
							<input
								bind:value={currentMenu.name}
								name="menu-title"
								class="text-md h-8 w-4/5 rounded-md outline-none border-2 border-white hover:border-emerald-500 text-black px-1" />
						</span>

						<span class="flex flex-col w-full justify-start items-start gap-2">
							<label for="menu-description" class="text-xl p-1"
								>Menu Description</label>
							<textarea
								rows="3"
								bind:value={currentMenu.description}
								name="menu-description"
								class="text-md w-1/3 h-fit rounded-md outline-none border-2 border-white hover:border-emerald-500 text-black px-1" />
						</span>
					</section>

					<span class="flex flex-row justify-start items-start gap-2">
						<button
							on:click={() => {
								editMenu = false;
								menus = menus; // force a redraw of the table with the new title
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
						<td class="pl-2" on:click={() => (currentMenu = m)}>{m.name}</td>
						<td class="w-10 p-1">
							<button
								on:click={() => {
									menus = menus.splice(i, 1);
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
							<button
								class="w-full items-center justify-center flex flex-row rounded-lg border-2 border-emerald-500 dark:bg-emerald-700 bg-emerald-100 p-1 dark:hover:bg-emerald-800 hover:bg-emerald-300">
								View
							</button>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
