<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	console.log(data.menu_info);

	const sections = ['Starters', 'Mains', 'Desssert'];
	const recipes = ['Dish', 'Dish', 'Dish'];
</script>

<div class="flex flex-col border-4 justfiy-center">
	<h1
		class="flex flex-col border-4 border-emerald-700 text-emerald-700 dark:text-emerald-300 text-4xl text-center">
		{data.menu_info.name}
	</h1>
	<!-- This will contain all sections and recipes -->
	<div class="flex flex-col border-4 border-emerald-300">
		{#each sections as section}
			<h2 class="text-3xl text-emerald-700 px-5">{section}</h2>
			<!-- Displaying the recipes and adding recipe to section, need to check if a recipe exists first -->
			<!-- Need to make recipes with section_id -->
		{/each}
	</div>
</div>
