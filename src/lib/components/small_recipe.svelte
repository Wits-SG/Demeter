<script lang="ts">
	import { Icon } from 'flowbite-svelte-icons';
	import { createAccordion, melt, createTabs } from '@melt-ui/svelte';
	import { slide } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';
	import { crossfade } from 'svelte/transition';

	export let recipeID: string = '';
	export let cookbook_id: string = '';
	let smallRecipeData: any;

	const {
		elements: { root, list, content, trigger },
		states: { value }
	} = createTabs({
		defaultValue: 'tab-1'
	});

	let className = '';
	export { className as class };

	const triggers = [
		{ id: 'tab-1', title: 'Ingredients' },
		{ id: 'tab-2', title: 'Instructions' }
	];

	const [send, receive] = crossfade({
		duration: 250,
		easing: cubicInOut
	});

	const getSmallRecipeData = async () => {
		try {
			const smallRecipe_res = await fetch(`/api/recipe?recipe_id=${recipeID}`, {
				method: 'GET'
			});

			const recipe_data: JSON = await smallRecipe_res.json();
			return recipe_data;
		} catch (recipePreview_err: any) {
			console.error('Failed to fetch recipe');
		}
	};
	let recipeTitle = '';
	let recipeImageURL = '';
	let Description = '';
	let recipeCookingTime = '';
	let recipeServingSize = '';
	let recipeIngredients = '';
	let recipeInstructions = '';
	$: recipeID && refreshRecipe();

	let recipeExists = false;

	const refreshRecipe = async () => {
		smallRecipeData = await getSmallRecipeData();
		recipeTitle = smallRecipeData.recipe.name;
		Description = smallRecipeData.recipe.description;
		recipeImageURL = smallRecipeData.recipe.imageURL;
		recipeCookingTime = smallRecipeData.recipe.cookingTime;
		recipeServingSize = smallRecipeData.recipe.servingSize;
		recipeIngredients = smallRecipeData.recipe.ingredients;
		recipeInstructions = smallRecipeData.recipe.instructions;
	};

	import { createSeparator, type CreateSeparatorProps } from '@melt-ui/svelte';

	export let orientation: CreateSeparatorProps['orientation'] = 'vertical';

	const {
		elements: { root: vertical }
	} = createSeparator({
		orientation
	});
</script>

<!-- Contains the recipe name, ingredients, description, time and serving size -->

<div class="flex flex-row h-full w-full">
	<div class="flex flex-col w-1/2 items-center justify-center maax-w-[50vh]">
		<div class="flex flex-row w-full h-2/5 items-center justify-center">
			<!-- This will contain the picture and the name of the recipe  -->
			<div class="flex flex-row md:mx-auto w-1/3 justify-center px-5 py-5">
				<img alt="" src={recipeImageURL} class="object-fit" />
			</div>
			<h1 class="flex flex-row text-4xl font-semi-bold font-serif w-2/3 justify-center">
				{recipeTitle}
			</h1>
		</div>

		<div class=" flex flex-col h-4/5 justify-center">
			<h1
				class="text-3xl text-bold text-emerald-700 dark:text-emerald-300 font-semi-bold font-serif p-5 dark: text-emerald-300">
				DESCRIPTION
			</h1>
			<p class="font-serif text-xl text-black dark: text-white">{Description}</p>
		</div>
		<div class="flex flex-row h-1/5 gap-40 justify-center">
			<!-- this will contain the serving size and time to cook -->
			<div class="flex flex-row items-center justify-center gap-5">
				<Icon name="users-group-outline" class="h-10 w-10" />
				<p class="">
					{recipeServingSize} Person
				</p>
			</div>
			<div class="flex flex-row items-center justify center gap-5">
				<Icon name="clock-outline" class="h-10 w-10" />
				<p class="">
					~{recipeCookingTime} Mins
				</p>
			</div>
		</div>
	</div>
	<div use:melt={$vertical} class="h-full w-[3px] bg-emerald-700" />
	<div class="flex flex-row w-1/2 h-full justify-center items-center">
		<div class="flex flex-col h-full justify-start items-center min-w-[100vh] p-5">
			<div
				use:melt={$root}
				class="flex max-w-[25rem] flex-col overflow-hidden rounded-xl shadow-lg
			data-[orientation=vertical]:flex-row {className} ">
				<div
					use:melt={$list}
					class="flex shrink-0 overflow-x-auto bg-neutral-100
					data-[orientation=vertical]:flex-col data-[orientation=vertical]:border-r"
					aria-label="Manage your account">
					{#each triggers as triggerItem}
						<button
							use:melt={$trigger(triggerItem.id)}
							class="trigger relative
						flex items-center justify-center rounded-none bg-emerald-300 text-emerald-700 font-bold leading-6
						text-lg font-serif flex-1 h-12 p-2 focus:relative focus-visible: z-10 ring-2 data-[state=active]:focus:relative data-[state=active]:bg-neutral-100 data-[state=active]:text-emerald-300
						dark:bg-emerald-700 dark:text-emerald-300 dark:data-[state=active]:bg-neutral-800">
							{triggerItem.title}
							{#if $value === triggerItem.id}
								<div
									in:send={{ key: 'trigger' }}
									out:receive={{ key: 'trigger' }}
									class="absolute bottom-1 left-1/2 h-1 w-6 -translate-x-1/2 rounded-full bg-magnum-400" />
							{/if}
						</button>
					{/each}
				</div>
				<div
					use:melt={$content('tab-1')}
					class="grow bg-neutral-100 bg-neutral-800 p-5 overflow-scroll min-w-[100vh]">
					<ul class="list-inside text-md list-disc text-start overflow-scroll">
						{#each recipeIngredients as ingredients}
							<li class="text-black dark:text-white">
								{ingredients}
							</li>
						{/each}
					</ul>
				</div>

				<div
					use:melt={$content('tab-2')}
					class="grow bg-neutral-100 p-5 overflow-scroll dark:bg-neutral-800">
					<ol
						class="list-decimal list-inside text-md overflow-scroll items-center text-black dark:text-white">
						{#each recipeInstructions as instruction}
							<li
								class="border-emerald-700 shadow-lg dark:border-emerald-300 rounded hover:bg-emerald-300 p-2 border-2 mb-2 text-start min-w-[20rem]">
								{instruction}
							</li>
						{/each}
					</ol>
				</div>
			</div>
		</div>
	</div>
</div>

<!-- <style lang="postcss">
	.trigger {
		display: flex;
		align-items: center;
		justify-content: center;

		cursor: default;
		user-select: none;

		border-radius: 0;
		background-color: #a7f3d0;
		

		color: #047857; 
		
		font-weight: bold;
		line-height: 3;
		font-size: large;
		font-family: serif;

		flex: 1;
		height: theme(spacing.12);
		padding-inline: theme(spacing.2);

		&:focus {
			position: relative;
		}

		&:focus-visible {
			@apply z-10 ring-2;
		}

		&[data-state='active'] {
			@apply focus:relative;
			background-color: #f5f5f5;
			color: #047857;
			dark: text-emerald-300, bg-neutral-900;
		}
	}
</style> -->
