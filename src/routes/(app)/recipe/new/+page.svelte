<script lang="ts">
	import { Icon } from 'flowbite-svelte-icons';

	let recipeName: string;
	let description: string;

	let picture: File;

	let avatar: any, fileinput: any;

	const onFileSelected = (e: any) => {
		let image = e.target.files[0];
		let reader = new FileReader();
		reader.readAsDataURL(image);
		reader.onload = (e) => {
			avatar = e.target?.result;
		};
	};

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

			<label class="text-lg font-bold" for="picture"> Select image: </label>
			<img class="w-[350px] h-[350px]" src={avatar} alt="None found" />
			<input
				type="file"
				id="picture"
				name="picture"
				accept="image/*"
				on:change={(e) => onFileSelected(e)} />

			<!--this section displays the space for time, serves, skill and ingredients-->

			<div class="mb-2 flex flex-row justify-center items-center">
				<label class="text-lg font-bold" for="skillLevel"> Skill Level: </label>
				<Icon name="arrow-up-down-outline" class="h-5 w-5" />
				<select
					id="skillLevel"
					name="skillLevel"
					class="p-1 w-fit text-black rounded-md focuse:outline-none focus:outline-2 focus:outline-emerald-500">
					<option value="beginner">Beginner</option>
					<option value="intermediate">Intermediate</option>
					<option value="advanced">Advanced</option>
				</select>
			</div>

			<div class="mb-2 flex flex-row justify-center items-center gap-5">
				<label class="text-lg font-bold" for="servingSize"> Serves </label>
				<Icon name="users-group-outline" class="h-5 w-5" />
				<input
					bind:value={servingSize}
					class="p-1 w-fit text-black rounded-md focuse:outline-none focus:outline-2 focus:outline-emerald-500"
					type="number"
					name="servingSize"
					min="1"
					max="48" />
			</div>

			<span class="mb-2 flex flex-row justify-center items-center">
				<label class="text-lg font-bold" for="cookingTime"> Time (in minutes) </label>
				<Icon name="clock-outline" class="h-5 w-5" />
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
		</section>
	</div>
</div>
