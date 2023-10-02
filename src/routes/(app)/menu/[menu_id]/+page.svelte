<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	console.log(data.menu_info);

	const recipes = ['Dish', 'Dish', 'Dish'];
</script>

<div class="flex flex-col border-4 justify-center">
	<h1
		class="flex flex-col border-4 border-emerald-700 text-emerald-700 dark:text-emerald-300 text-4xl text-center">
		{data.menu_info.name}
	</h1>
	<!-- This will contain all sections and recipes -->
	<div class="flex flex-col border-4 border-emerald-300">
		{#each data.menu_info.section as section, i}
			<h2 class="text-3xl text-emerald-700 px-5">{section}</h2>
			<!-- Displaying the recipes and adding recipe to section, need to check if a recipe exists first -->
			<!-- Need to make recipes with section_id -->

			<div class="flex flex-col border-4 border-emerald-100 px-10">
				{recipe_info[i]}
			</div>
		{/each}
	</div>

	<div
		class="flex flex-col border-2 dark:border-emerald-300 border-emerald-300 justify-center items-center p-1">
		<button
			on:click={deleteMenu}
			class="rounded-full border-2 w-40 h-10 border-emerald-700 text-emerald-700 dark:text-emerald-300 text-lg font-semibold">
			Delete Menu
		</button>
	</div>
</div>

<!--
	@ Ashlea if you want to make Menu centered in the page with 3/4 width so that is looks like our original page design
	you can put all currenct code into this div:

	<div class="flex justify-center items-center">
		...exisiting code but set width -> w-3/4 in the class of this top div
	</div>
-->
