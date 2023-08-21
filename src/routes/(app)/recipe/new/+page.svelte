<script lang="ts">
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
		// This is how to update an array in svelte and to trigger a html redraw
		// i.e. for it to actually update the view
		instructionList = [...instructionList, inputInstruction];
		inputInstruction = '';
	}
</script>

<div class="w-screen h-screen bg-zinc-100 flex flex-col justify-center gap-20">
	<div class="flex flex-row items-center justify-start">
		<!-- this is the start of the first column, which includes the title, description, photo-->
		<section class="flex flex-col items-center w-1/3 gap-5">
			<label for="title"> Recipe Title </label>
			<input
				class="p-1 w-full text-black rounded-md focus:outline-none focus:outline-2 focus:outline-emerald-500"
				maxlength="64"
				type="text" />

			<label for="description"> Recipe Description </label>
			<textarea
				class="block w-full h-fit rounded-md focus:outline-none focus:outline-2 focus:outline-emerald-500"
				id="decription"
				rows="3"
				maxlength="1024"
				placeholder="Give a short description of your recipe" />

			<div class="block min-h-[350px] min-w-[350px] bg-emerald-300">insert picture</div>
		</section>

		<section class="flex flex-col items-center w-1/4 gap-5">
			<!--this section displays the space for time, serves, skill and ingredients-->

			<div class="mb-2">
				<label for="skill">Skill</label><br />
				<select id="skill" name="skill" class="w-64 border rounded p-1">
					<option value="beginner">Beginner</option>
					<option value="intermediate">Intermediate</option>
					<option value="advanced">Advanced</option>
				</select>
			</div>

			<span class="flex flex-col justify-center items-start">
				<label for="serves">Serves</label>
				<input
					class="p-1 w-64 text-black rounded-md focuse:outline-none focus:outline-2 focus:outline-emerald-500"
					type="number"
					name="serves"
					min="1"
					max="48" />
			</span>

			<span class="flex flex-col justify-center items-start">
				<label for="time">Time (in minutes)</label>
				<input
					class="p-1 w-64 text-black rounded-md focuse:outline-none focus:outline-2 focus:outline-emerald-500"
					type="number"
					name="time"
					step="15"
					min="15" />
			</span>

			<p>Type your ingredient and click add to add it to your list</p>
			<input
				bind:value={inputIngredient}
				class="p-1 w-64 text-black rounded-md focuse:outline-none focus:outline-2 focus:outline-emerald-500"
				type="text" />
			<button on:click={addIngredients}>Add ingredients</button>

			<h2>Ingredients</h2>
			{#if ingredientsList.length != 0}
				{#each ingredientsList as ingredient}
					<p>{ingredient}</p>
				{/each}
			{:else}
				<p>No Ingredients yet</p>
			{/if}

			<label for="instruction"> Instructions </label>
			<textarea
				bind:value={inputInstruction}
				class="block w-full h-fit rounded-md focus:outline-none focus:outline-2 focus:outline-emerald-500"
				id="instructions"
				rows="4"
				maxlength="1024"
				placeholder="type a step of your instruction and click add to start the next" />
			<button on:click={addInstructions}>Add instruction</button>

			<h2>Instructions</h2>
			{#if instructionList.length != 0}
				{#each instructionList as instruction}
					<p>{instruction}</p>
				{/each}
			{:else}
				<p>No instructions yet</p>
			{/if}
		</section>
	</div>
</div>
