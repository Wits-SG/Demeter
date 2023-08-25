<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	$: console.log(data);
</script>

<!-- onclick="window.location.href='http://localhost:5173/cookbook/1';" -->
<div class="mt-20 flex flex-col mx-20 h-screen w-screen">
	<div class="flex flex-col">
		<h1 class="text-3xl">COOKBOOKS</h1>
		<div class="mt-10 ml-10 space-x-10 flex flex-row align-center">
			<button
				class="rounded-md border-2 w-32 h-32 border-emerald-700 text-4xl text-emerald-700 dark:text-emerald-300 dark:border-emerald-300"
				>+</button>
			<div class="flex flex-row items-center">
				{#each data.cookbooks as cookbook}
					<!-- <button onclick="window.location.href='http://localhost:5173/app/cookbook/{ids}';"class="rounded-md border-2 w-32 h-32 border-emerald-700 text-4xl text-emerald-700 dark:text-emerald-300 dark:border-emerald-300">
						{data.cookbook.name}
					</button> -->

					<a class="flex justify-center items-center" href="/cookbook/{cookbook.id}"
						>{cookbook.name}</a>
				{/each}
			</div>
		</div>
	</div>
	<hr class="h-1 my-4 md:my-10 bg-emerald-700 dark:bg-emerald-300 border-0" />

	<div class="flex flex-col">
		<div class="flex flex-col">
			<h1 class="text-3xl">MENUS</h1>
			<div class="mt-10 ml-10 space-x-10 flex flex-row align-center">
				<button
					class="rounded-md border-2 w-32 h-32 border-emerald-700 text-4xl text-emerald-700 dark:text-emerald-300 dark:border-emerald-300 text-center"
					>+</button>
				<!-- {#each cookbooks as cb}
					<button
						class="rounded-md border-2 w-32 h-32 border-emerald-700 text-xl text-emerald-700 dark:text-emerald-300 dark:border-emerald-300"
						>{data.cookbook.name}</button>
				{/each} -->
			</div>
		</div>
	</div>
</div>
