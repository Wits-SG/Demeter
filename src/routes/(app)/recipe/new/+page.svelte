<script lang="ts">
	import { Icon } from 'flowbite-svelte-icons';
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';
	//@ts-ignore
	import { v4 as uuidv4 } from 'uuid';
	import { fb_storage } from '$lib/firebase';
	import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
	import { userInfo } from '$lib/stores/user.store';

	export let data: PageData;

	let userId = $userInfo.userId;

	let recipeName: string;
	let description: string;

	let picture: File;
	let pictureLocalUrl: any;

	const onFileSelected = (e: any) => {
		picture = e.target.files[0];
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

	let editingIngredient: number | null = null;

	function editIngredient(index: number) {
		editingIngredient = index;
	}

	function deleteIngredient(index: number) {
		ingredientsList = ingredientsList.filter((_, i) => i !== index);
	}

	function addInstructions() {
		instructionList = [...instructionList, inputInstruction];
		inputInstruction = '';
	}

	let editingInstruction: number | null = null;

	function editInstruction(index: number) {
		editingInstruction = index;
	}

	function deleteInstruction(index: number) {
		instructionList = instructionList.filter((_, i) => i !== index);
	}

	let errorMessage: string = '';
	let hasError: boolean = false;

	function validateForm(): boolean {
		if (
			!recipeName ||
			!description ||
			!picture ||
			!servingSize ||
			!cookingTime ||
			ingredientsList.length === 0 ||
			instructionList.length === 0
		) {
			errorMessage = 'Please fill in all required fields.';
			hasError = true;
			return false;
		}

		hasError = false;
		errorMessage = '';
		return true;
	}

	async function postRecipe() {
		if (validateForm()) {
			const recipeId = uuidv4();
			const recipeImageRef = ref(fb_storage, `images/recipe/${recipeId}.jpeg`);

			await uploadBytes(recipeImageRef, picture);

			const imageUrl = await getDownloadURL(recipeImageRef);

			const postId = uuidv4();

			await fetch('/recipe/new', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					id: recipeId,
					userId: userId,
					postId: postId,
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
		} else {
			// Display the error message
			errorMessage = 'Please fill in all required fields.';
			hasError = true;
		}
	}
</script>

<div class="w-full h-full flex flex-col gap-12 p-6">
	<h1 class="flex justify-center font-bold" style="font-size:45px;">Create your own Recipe</h1>
	{#if hasError}
		<p class="text-red-500 flex justify-center">{errorMessage}</p>
	{/if}
	<div class="flex flex-row gap-5">
		<!-- this is the start of the first column, which includes the title, description, photo-->
		<section class="flex flex-col items-center w-1/3 gap-5">
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
				class="block w-full h-fit dark:text-black rounded-md focus:outline-none focus:outline-2 focus:outline-emerald-500"
				id="decription"
				rows="3"
				maxlength="512"
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

			<div class="mb-2 flex flex-row items-center gap-3">
				<Icon name="arrow-up-down-outline" class="h-5 w-5" />
				<label class="text-lg font-bold" for="skillLevel"> Skill Level:</label>
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

			<div class="mb-2 flex flex-row justify-center items-center gap-3">
				<Icon name="users-group-outline" class="h-5 w-5" />
				<label class="text-lg font-bold" for="servingSize"> Serves:</label>
				<input
					bind:value={servingSize}
					class="p-1 w-fit text-black rounded-md focus:outline-none focus:outline-2 focus:outline-emerald-500"
					type="number"
					name="servingSize"
					min="1"
					max="48" />
			</div>

			<div class="mb-2 flex flex-row justify-center items-center gap-3">
				<Icon name="clock-outline" class="h-5 w-5" />
				<label class="text-lg font-bold" for="cookingTime"> Time:</label>
				<input
					bind:value={cookingTime}
					class="p-1 w-fit text-black rounded-md focus:outline-none focus:outline-2 focus:outline-emerald-500"
					type="number"
					name="cookingTime"
					step="15"
					min="15"
					placeholder="time in minutes" />
			</div>
		</section>

		<section class="flex flex-col items-center w-1/3 gap-5">
			<h2 class="text-lg font-bold">Ingredients List</h2>
			<ul class="list-disc list-inside">
				{#if ingredientsList.length != 0}
					{#each ingredientsList as ingredient, index}
						<li
							style="max-width:350px; overflow:hidden; white-space:pre-wrap; word-wrap:break-word;"
							class="mb-2">
							{ingredient}
							<button
								class="ml-2 text-emerald-500 align-left"
								on:click={() => editIngredient(index)}>
								<Icon name="edit-outline" class="h-5 w-5" />
							</button>

							<button
								class="ml-2 text-emerald-500 align-left"
								on:click={() => deleteIngredient(index)}>
								<Icon name="trash-bin-outline" class="h-5 w-5" />
							</button>
						</li>
					{/each}
				{:else}
					<p>No Ingredients yet</p>
				{/if}
			</ul>

			{#if editingIngredient !== null}
				<input
					bind:value={ingredientsList[editingIngredient]}
					on:keydown={(event) => {
						if (event.key === 'Enter' || event.keyCode === 13) {
							event.preventDefault();
							editingIngredient = null;
						}
					}}
					class="p-1 w-fit text-black rounded-md focus:outline-none focus:outline-2 focus:outline-emerald-500"
					type="text"
					placeholder="Edit ingredient" />
			{/if}

			<input
				bind:value={inputIngredient}
				on:keydown={(event) => {
					if (event.key === 'Enter' || event.keyCode === 13) {
						event.preventDefault();
						addIngredients();
					}
				}}
				class="p-1 w-fit text-black rounded-md focus:outline-none focus:outline-2 focus:outline-emerald-500"
				type="text"
				placeholder="Insert an ingredient" />
			<button
				class="h-10 w-48 items-center justify-center flex flex-row gap-1 rounded-lg border-2 border-emerald-500 dark:bg-emerald-700 bg-emerald-100 p-2 dark:hover:bg-emerald-800 hover:bg-emerald-300"
				on:click={addIngredients}>
				Add ingredients
			</button>
		</section>

		<section class="flex flex-col items-center w-1/3 gap-5">
			<button
				class="h-10 w-48 items-center justify-center flex flex-row gap-1 rounded-lg border-2 border-emerald-500 dark:bg-emerald-700 bg-emerald-100 p-2 dark:hover:bg-emerald-800 hover:bg-emerald-300"
				on:click={postRecipe}>
				Post
			</button>

			<label for="instruction" class="text-lg font-bold"> Instructions </label>

			<textarea
				bind:value={inputInstruction}
				class="block w-full h-fit dark:text-black rounded-md focus:outline-none focus:outline-2 focus:outline-emerald-500"
				id="instructions"
				rows="3"
				maxlength="1024"
				placeholder="type a step of your instruction and click add to start the next" />
			<button
				class="h-10 w-48 items-center justify-center flex flex-row gap-1 rounded-lg border-2 border-emerald-500 dark:bg-emerald-700 bg-emerald-100 p-2 dark:hover:bg-emerald-800 hover:bg-emerald-300"
				on:click={addInstructions}>
				Add instruction
			</button>

			<ol class="list-decimal list-inside">
				{#if instructionList.length != 0}
					{#each instructionList as instruction, index}
						<li
							style="max-width:425px; overflow:hidden; white-space:pre-wrap; word-wrap:break-word;"
							class="box-content text-zinc-950 bg-gray-50 dark:bg-zinc-800 dark:text-zinc-100 p-2 border-2 mb-2 border-teal-500 rounded-lg">
							{instruction}
							<button
								class="ml-2 text-emerald-500 align-left"
								on:click={() => editInstruction(index)}>
								<Icon name="edit-outline" class="h-5 w-5" />
							</button>

							<button
								class="ml-2 text-emerald-500 align-left"
								on:click={() => deleteInstruction(index)}>
								<Icon name="trash-bin-outline" class="h-5 w-5" />
							</button>
						</li>
					{/each}
				{:else}
					<p>No Ingredients yet</p>
				{/if}
			</ol>

			{#if editingInstruction !== null}
				<textarea
					bind:value={instructionList[editingInstruction]}
					on:keydown={(event) => {
						if (event.key === 'Enter' || event.keyCode === 13) {
							event.preventDefault();
							editingInstruction = null;
						}
					}}
					class="p-1 w-full dark:text-black rounded-md focus:outline-none focus:outline-2 focus:outline-emerald-500"
					placeholder="Edit instruction"
					rows="3"
					maxlength="1024" />
			{/if}
		</section>
	</div>
</div>
