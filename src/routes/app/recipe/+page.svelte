<script lang="ts">
	import picture from '$lib/assests/pictures/penne-alla-vodka.jpg';
	import logo from '$lib/assests/pictures/logo.png';

	let recipeName = 'Penna Alla Vodka';
	let recipeDescription =
		'A classic Italian-American pasta dish known for its creamy tomato-based sauce with a touch of vodka.';
</script>

<div class="w-screen h-screen bg-zinc-100 flex-col items-center justify-center">
	<div class="green-bar bg-emerald-500 flex items-center justify-start">
		<div class="flex justify-start items-start p-20 mx-60">
			<img alt="" src={logo} height="200" width="200" />
		</div>
	</div>

	<div class="flex justify-start items-start pl-20 pt-20 mx-60">
		<img alt="" src={picture} height="400" width="400" />

		<div class="flex flex-col justify-center items-center mx-40">
			<h1 class="text-6xl font-serif pb-4">{recipeName}</h1>
			<h3 class="text-3xl font-serif pt-4 underline">Description</h3>
			<p class="text-lg pt-4">{recipeDescription}</p>

			<div class="grid grid-cols-3 gap-x-40 mt-20">
				<div>01</div>
				<div>02</div>
				<div>03</div>
			</div>
		</div>
	</div>
</div>

<style>
	.green-bar {
		height: 140px;
		width: 100%;
	}
</style>
