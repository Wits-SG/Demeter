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

			<label for="skill"> Skill Level </label>
			<div class="inline-block relative w-64">
				<select
					class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
					<option>Beginner</option>
					<option>Intermediate</option>
					<option>Advanced</option>
				</select>
				<div
					class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
					<svg
						class="fill-current h-4 w-4"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						><path
							d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
				</div>
			</div>

			<label for="serves"> Serves </label>
			<div class="inline-block relative w-64">
				<select
					class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
					<option>1</option>
					<option>2</option>
					<option>3</option>
					<option>4</option>
					<option>5</option>
					<option>6</option>
					<option>7</option>
					<option>8</option>
				</select>
				<div
					class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
					<svg
						class="fill-current h-4 w-4"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						><path
							d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
				</div>
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
