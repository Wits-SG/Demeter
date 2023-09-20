<script lang="ts">
	import { Icon } from 'flowbite-svelte-icons';
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';
	import { v4 as uuidv4 } from 'uuid';
	import { fb_storage } from '$lib/firebase';
	import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

	export let data: PageData;

	let recipeName: string;
	let description: string;

	let picture: File;
	let pictureLocalUrl: any;

	const onFileSelected = (e: any) => {
		picture = e.target.files[0];
		console.log(picture instanceof File);
		let reader = new FileReader();
		reader.readAsDataURL(picture);
		reader.onload = (e) => {
			pictureLocalUrl = e.target?.result;
		};
	};

	let servingSize: number;
	let cookingTime: number;
	let skillLevel: number;

	let inputIngredient: string;
	let ingredientsList: Array<string> = [];

	let inputInstruction: string;
	let instructionList: Array<string> = [];

	function addIngredients() {
		// This is how to update an array in svelte and to trigger a html redraw
		// i.e. for it to actually update the view
		ingredientsList = [...ingredientsList, inputIngredient];
		inputIngredient = '';
	}

	function addInstructions() {
		instructionList = [...instructionList, inputInstruction];
		inputInstruction = '';
	}

	async function saveRecipe() {
		const recipeId = uuidv4();
		const recipeImageRef = ref(fb_storage, `images/recipe/${recipeId}.jpeg`);

		await uploadBytes(recipeImageRef, picture);

		const imageUrl = await getDownloadURL(recipeImageRef);

		await fetch('/recipe/new', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				id: recipeId,
				name: recipeName,
				description: description,
				servingSize: servingSize,
				skillLevel: skillLevel,
				cookingTime: cookingTime,
				imageUrl: imageUrl,
				instructions: instructionList,
				ingredients: ingredientsList
			})
		});

		goto(`/recipe/${recipeId}`);
	}
</script>

<div class="w-full h-full bg-zinc-100 flex flex-col justify-center gap-20">
	<h1 class="flex justify-center font-bold" style="font-size:45px;">Create your own Recipe</h1>
	<div class="flex flex-row items-center justify-start gap-10">
		<!-- this is the start of the first column, which includes the title, description, photo-->
		<section class="flex flex-col items-center w-1/2 gap-5">
			<label class="text-lg font-bold" for="recipeName"> Recipe Title </label>

			<input
				bind:value={recipeName}
				class="p-1 w-full text-black rounded-md focus:outline-none focus:outline-2 focus:outline-emerald-500"
				maxlength="64"
				type="text"
				placeholder="Type the heading of your recipe" />

			<label class="text-lg font-bold" for="description"> Recipe Description </label>

			<textarea
				bind:value={description}
				class="block w-full h-fit rounded-md focus:outline-none focus:outline-2 focus:outline-emerald-500"
				id="decription"
				rows="3"
				maxlength="1024"
				placeholder="Give a short description of your recipe" />

			<label class="text-lg font-bold" for="picture"> Select image: </label>
			<img class="w-fit h-fit" src={pictureLocalUrl} alt="None found" />
			<input
				type="file"
				id="picture"
				name="picture"
				accept="image/*"
				on:change={(e) => onFileSelected(e)} />

			<!--this section displays the space for time, serves, skill and ingredients-->

			<div class="mb-2 flex flex-row justify-center items-center">
				<label class="text-lg font-bold" for="skillLevel"> Skill Level</label>
				<Icon name="arrow-up-down-outline" class="h-5 w-5" />
				<select
					id="skillLevel"
					name="skillLevel"
					bind:value={skillLevel}
					class="p-1 w-fit text-black rounded-md focus:outline-none focus:outline-2 focus:outline-emerald-500">
					{#each data.skillLevels as sl, index}
						<option value={index + 1}>{sl}</option>
					{/each}
				</select>
			</div>

			<div class="mb-2 flex flex-row justify-center items-center gap-5">
				<label class="text-lg font-bold" for="servingSize"> Serves</label>
				<Icon name="users-group-outline" class="h-5 w-5" />
				<input
					bind:value={servingSize}
					class="p-1 w-fit text-black rounded-md focus:outline-none focus:outline-2 focus:outline-emerald-500"
					type="number"
					name="servingSize"
					min="1"
					max="48" />
			</div>

			<span class="mb-2 flex flex-row justify-center items-center">
				<label class="text-lg font-bold" for="cookingTime"> Time</label>
				<Icon name="clock-outline" class="h-5 w-5" />
				<input
					bind:value={cookingTime}
					class="p-1 w-fit text-black rounded-md focuse:outline-none focus:outline-2 focus:outline-emerald-500"
					type="number"
					name="cookingTime"
					step="15"
					min="15"
					placeholder="time in minutes" />
			</span>
		</section>

		<section class="flex flex-col items-center w-1/2 gap-5">
			<h2 class="text-lg font-bold">Ingredients</h2>
			<p>
				Type your ingredient in the box below. Click the "Add Ingredient" button to add it
				to your list of ingreidents
			</p>
			<input
				bind:value={inputIngredient}
				class="p-1 w-fit text-black rounded-md focuse:outline-none focus:outline-2 focus:outline-emerald-500"
				type="text"
				placeholder="Insert an ingredient" />
			<button
				class="w-72 h-12 rounded-md bg-emerald-500 hover:bg-emerald-400 dark:hover:bg-emerald-600"
				on:click={addIngredients}>
				Add ingredients
			</button>

			<h2 class="text-lg font-bold">Ingredients List</h2>
			<ul class="list-disc list-inside">
				{#if ingredientsList.length != 0}
					{#each ingredientsList as ingredient}
						<li class="mb-2">
							{ingredient}
						</li>
					{/each}
				{:else}
					<p>No Ingredients yet</p>
				{/if}
			</ul>

			<label for="instruction" class="text-lg font-bold"> Instructions </label>
			<textarea
				bind:value={inputInstruction}
				class="block w-full h-fit rounded-md focus:outline-none focus:outline-2 focus:outline-emerald-500"
				id="instructions"
				rows="4"
				maxlength="1024"
				placeholder="type a step of your instruction and click add to start the next" />
			<button
				class="w-72 h-12 rounded-md bg-emerald-500 hover:bg-emerald-400 dark:hover:bg-emerald-600"
				on:click={addInstructions}>
				Add instruction
			</button>

			<h2 class="text-lg font-bold">Instructions List</h2>
			<ul class="list-disc list-inside">
				{#if instructionList.length != 0}
					{#each instructionList as instruction}
						<li class="mb-2">
							{instruction}
						</li>
					{/each}
				{:else}
					<p>No Ingredients yet</p>
				{/if}
			</ul>

			<button
				class="w-72 h-12 rounded-md bg-emerald-500 hover:bg-emerald-400 dark:hover:bg-emerald-600"
				on:click={saveRecipe}>
				Save
			</button>
		</section>
	</div>
</div>
