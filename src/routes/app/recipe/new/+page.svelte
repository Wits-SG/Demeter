<script>
</script>

<div class="w-screen h-screen bg-zinc-100 flex flex-col justify center gap-20">
	<h1 class="text-6xl font-serif">Make your own recipe</h1>
	<div class="flex flex-row items-center justify-start">
		<!-- this is the start of the first column, which includes the title, description, photo-->
		<section class="flex flex-col items-center w-1/3 gap-5">
			<label for="title"> Recipe Title </label>
			<textarea
				class="block min-h-[50px] min-w-[400px] border border-black-100"
				id="title"
				rows="2"
				placeholder="Give your recipe a title" />

			<label for="description"> Recipe Description </label>
			<textarea
				class="block min-h-[150px] min-w-[400px] border border-blue-100"
				id="decription"
				rows="5"
				placeholder="Give a short description of your recipe" />

			<div class="block min-h-[350px] min-w-[350px] bg-emerald-300">insert picture</div>
		</section>

		<section class="flex flex-col items-center w-1/4 gap-5">
			<!--this section displays the space for time, serves, skill and ingredients-->

			<div class="mb-2">
				<label for="skill">Skill</label>
				<select id="skill" name="skill" class="w-full border rounded p-1">
					<option value="beginner">Beginner</option>
					<option value="intermediate">Intermediate</option>
					<option value="advanced">Advanced</option>
				</select>
			</div>

			<div class="mb-2">
				<label for="serves">Serves</label>
				<select id="serves" name="serves" class="w-full border rounded p-1">
					<option value="1">1</option>
					<option value="2">2</option>
					<option value="3">3</option>
					<option value="4">4</option>
					<option value="5">5</option>
					<option value="6">6</option>
					<option value="7">7</option>
					<option value="8">8</option>
					<option value="9">9</option>
					<option value="10">10</option>
				</select>
			</div>

			<label for="ingredients"> Ingredients </label>
			<textarea
				class="block min-h-[150px] min-w-[400px] border border-blue-100"
				id="decription"
				rows="5"
				placeholder="List ingredients" />
		</section>
	</div>
</div>
