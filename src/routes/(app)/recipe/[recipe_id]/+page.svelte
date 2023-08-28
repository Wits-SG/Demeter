<script lang="ts">
	import { Icon } from 'flowbite-svelte-icons';
	import type { PageData } from './$types';
	import { createSeparator, melt, type CreateSeparatorProps } from '@melt-ui/svelte';
	import { createAccordion } from '@melt-ui/svelte';
	import { slide } from 'svelte/transition';

	export let data: PageData;

	let savedState = 'Save this recipe';
	function toggleSavedState() {
		if (savedState === 'Save this recipe') {
			savedState = 'Saved!';
		} else {
			savedState = 'Save this recipe';
		}
	}

	export let orientation: CreateSeparatorProps['orientation'] = 'vertical';

	const {
		elements: { root: vertical }
	} = createSeparator({
		orientation
	});

	const {
		elements: { root: horizontal }
	} = createSeparator({
		orientation: 'horizontal',
		decorative: true
	});

	const {
		elements: { content, item, trigger, root },
		helpers: { isSelected }
	} = createAccordion({
		defaultValue: ['Ingredients'],
		multiple: true
	});

	const items = [
		{
			id: 'ingredients',
			title: 'INGREDIENTS',
			description: data.recipe.ingredients
		},
		{
			id: 'instructions',
			title: 'INSTRUCTIONS',
			description: data.recipe.instructions
		}
	];
</script>

<div
	class="w-full h-full bg-zinc-100 dark:bg-zinc-800 flex flex-col justify-center items-center gap-20 pt-6">
	<div class="flex flex-col justify-start items-start">
		<h1 class="text-6xl font-serif">{data.recipe.name}</h1>
	</div>

	<div class="flex flex-row justify start items-start gap-1">
		<section class="flex flex-col items-center justify-center w-1/2 gap-10">
			<section class="container md:mx-auto w-2/3">
				<img alt="" src={data.recipe.imageUrl} class="object-cover" />
			</section>

			<section class="grid grid-cols-3 items-center justify-center gap-20">
				<div class="flex flex-col items-center justify-center gap-2">
					<Icon name="users-group-outline" class="h-7 w-7" />
					<p class="">
						{#if data.recipe.servingSize > 1}
							{data.recipe.servingSize} People
						{:else}
							{data.recipe.servingSize} Person
						{/if}
					</p>
				</div>
				<div class="flex flex-col items-center justify center gap-2">
					<Icon name="clock-outline" class="h-7 w-7" />
					<p class="">
						~ {#if data.recipe.cookingTime < 60}
							{data.recipe.cookingTime} Mins
						{:else}
							{data.recipe.cookingTime / 60} Hours
						{/if}
					</p>
				</div>
				<div class="flex flex-col items-center justify center gap-2">
					<Icon name="arrow-up-down-outline" class="h-7 w-7" />
					<p class="">
						{data.recipe.skillLevel}
					</p>
				</div>
			</section>

			<div
				use:melt={$horizontal}
				class="items-center justify-center h-[3px] w-3/5 bg-teal-600 dark:bg-teal-400" />

			<!-- <section class="grid grid-cols-2 items-center gap-20">
				<div class="flex flex-col items-center gap-2">
					<Icon name="message-caption-outline" class="h-14 w-14" />
					<button
						class="p-5 bg-emerald-500 rounded-full w-full h-12 text-center text-md flex justify-center items-center hover:bg-emerald-600">
						Write a review
					</button>
				</div>
				<div class="flex flex-col items-center gap-2">
					<Icon name="heart-outline" class="h-14 w-14" />
					<button
						on:click={toggleSavedState}
						class="p-5 bg-emerald-500 rounded-full w-full h-12 text-center text-md flex justify-center items-center hover:bg-emerald-600">
						{savedState}
					</button>
				</div>
			</section> -->
		</section>

		<div class="flex flex-col items-start gap-20 w-1/2">
			<section class="flex flex-col items-center gap-10 w-4/5">
				<h3 class="text-3xl font-serif underline">Description</h3>
				<p class="text-lg">{data.recipe.description}</p>
			</section>

			<section class="flex flex-col h-2/3 w-5/6 justify-center items-center overflow-hidden">
				<div class="w-5/6">
					{#each items as { id, title }, i}
						<div
							use:melt={$item(id)}
							class="overflow-hidden transition-colors first:rounded-t-xl last:rounded-b-xl">
							<h2 class="flex">
								<button
									use:melt={$trigger(id)}
									class="flex flex-1 cursor-pointer items-center justify-center
										bg-teal-600 px-5 py-5 text-lg leading-none
										text-white transition-colors hover:bg-emerald-300 focus:!ring-0
										focus-visible:text-magnum-800
										i !== 0 && 'border-t border-t-neutral-300">
									{title}
								</button>
							</h2>
							{#if $isSelected(id)}
								<div
									class="content overflow-hidden bg-neutral-100 text-md text-neutral-600"
									use:melt={$content(id)}
									transition:slide>
									<div class="px-5 py-4">
										{#if title == 'INSTRUCTIONS'}
											<div>
												<ol
													class="list-decimal list-inside text-lg overflow-y-scroll">
													{#each data.recipe.instructions as instruction}
														<li
															class="box-content hover:bg-zinc-300 dark:hover:bg-zinc-200 p-3 border-4 mb-6">
															{instruction}
														</li>
													{/each}
												</ol>
											</div>
										{:else}
											<ul class="list-none list-inside text-lg">
												{#each data.recipe.ingredients as ingredient}
													<li
														class="flex flex-row justify-start items-center mb-2 gap-4">
														<Icon
															name="check-circle-outline"
															class="h-4 w-4 text-teal-400" />{ingredient}
													</li>
												{/each}
											</ul>
										{/if}
									</div>
								</div>
							{/if}
						</div>
					{/each}
				</div>
			</section>

			<!-- <section class="flex flex-col items-center w-4/5 h-1/5 gap-5">
				<h3 class="text-3xl font-serif underline">Ingredients</h3>
				<ul class="list-none list-inside text-lg overflow-y-scroll">
					{#each data.recipe.ingredients as ingredient}
						<li class="flex flex-row justify-start items-center mb-2 gap-4">
							<Icon
								name="check-circle-outline"
								class="h-4 w-4 text-teal-400" />{ingredient}
						</li>
					{/each}
				</ul>
			</section>

			<section class="flex flex-col items-center w-4/5 h-1/4 gap-5">
				<h3 class="text-3xl font-serif underline">Instructions</h3>
				<ol class="list-decimal list-inside text-lg overflow-y-scroll">
					{#each data.recipe.instructions as instruction}
						<li
							class="box-content hover:bg-zinc-300 dark:hover:bg-zinc-700 p-3 border-4 mb-6">
							{instruction}
						</li>
					{/each}
				</ol>
			</section> -->
		</div>
	</div>
</div>

<style>
</style>
