<script lang="ts">
	import { Icon } from 'flowbite-svelte-icons';

	let recipeName: string;
	let description: string;

	let picture: File;

	let servingSize: number;
	let cookingTime: number;
	let skillLevel;

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
</script>

<div class="w-full h-full bg-zinc-100 flex flex-col justify-center gap-20">
	<div class="flex flex-row items-center justify-start">
		<!-- this is the start of the first column, which includes the title, description, photo-->
		<section class="flex flex-col items-center w-1/2 gap-5">
			<label class="text-lg font-bold" for="recipeName"> Recipe Title </label>

			<input
				bind:value={recipeName}
				class="p-1 w-full text-black rounded-md focus:outline-none focus:outline-2 focus:outline-emerald-500"
				maxlength="64"
				type="text" />

			<label class="text-lg font-bold" for="description"> Recipe Description </label>

			<textarea
				bind:value={description}
				class="block w-full h-fit rounded-md focus:outline-none focus:outline-2 focus:outline-emerald-500"
				id="decription"
				rows="3"
				maxlength="1024"
				placeholder="Give a short description of your recipe" />

			<div class="block min-h-[350px] min-w-[350px] bg-emerald-300">insert picture</div>
			<label for="picture">Select image:</label>
			<input bind:value={picture} type="file" id="picture" name="picture" accept="image/*" />

			<!--this section displays the space for time, serves, skill and ingredients-->

			<div class="mb-2">
				<label class="text-lg font-bold" for="skillLevel">
					Skill Level:
					<Icon name="arrow-up-down-outline" class="h-5 w-5" />
				</label>
				<select
					id="skillLevel"
					name="skillLevel"
					class="p-1 w-fit text-black rounded-md focuse:outline-none focus:outline-2 focus:outline-emerald-500">
					<option value="beginner">Beginner</option>
					<option value="intermediate">Intermediate</option>
					<option value="advanced">Advanced</option>
				</select>
			</div>

			<div>
				<label class="text-lg font-bold" for="servingSize">
					<Icon name="users-group-outline" class="h-5 w-5" />
					Serves
				</label>
				<input
					bind:value={servingSize}
					class="p-1 w-fit text-black rounded-md focuse:outline-none focus:outline-2 focus:outline-emerald-500"
					type="number"
					name="servingSize"
					min="1"
					max="48" />
			</div>

			<span class="flex flex-col justify-center items-start">
				<label class="text-lg font-bold" for="cookingTime">
					<Icon name="clock-outline" class="h-5 w-5" />
					Time (in minutes)
				</label>
				<input
					bind:value={cookingTime}
					class="p-1 w-fit text-black rounded-md focuse:outline-none focus:outline-2 focus:outline-emerald-500"
					type="number"
					name="cookingTime"
					step="15"
					min="15" />
			</span>
		</section>

		<section class="flex flex-col items-center w-1/2 gap-5">
			<p>Type your ingredient and click add to add it to your list</p>
			<input
				bind:value={inputIngredient}
				class="p-1 w-fit text-black rounded-md focuse:outline-none focus:outline-2 focus:outline-emerald-500"
				type="text" />
			<button
				class="w-72 h-12 rounded-md bg-emerald-500 hover:bg-emerald-400 dark:hover:bg-emerald-600"
				on:click={addIngredients}>
				Add ingredients
			</button>

			<h2 class="text-lg font-bold">Ingredients</h2>
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

			<label for="instruction"> Instructions </label>
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

			<h2 class="text-lg font-bold">Instructions</h2>
			{#if instructionList.length != 0}
				{#each instructionList as instruction}
					<li
						class="box-content shadow-lg shadow-emerald-500 hover:bg-zinc-500 p-3 border-4 mb-6">
						{instruction}
					</li>
				{/each}
			{:else}
				<p>No instructions yet</p>
			{/if}
		</section>
	</div>
</div>
