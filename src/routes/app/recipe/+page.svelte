<script lang="ts">
	import picture from '$lib/assests/pictures/penne-alla-vodka.jpg';
	import logo from '$lib/assests/pictures/logo.png';
	import { Icon } from 'flowbite-svelte-icons';

	let recipeName = 'Penna Alla Vodka';
	let recipeDescription =
		'A classic Italian-American pasta dish known for its creamy tomato-based sauce with a touch of vodka.';
	let servingSize = 4;
	let cookingTime = 30;
	let skillLevel = 'Intermediate';
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
				<div class="flex flex-col items-center">
					<Icon name="users-group-outline" class="h-10 w-10" />
					<p class="pt-1">
						{servingSize} Person
					</p>
				</div>
				<div class="flex flex-col items-center">
					<Icon name="clock-outline" class="h-10 w-10" />
					<p class="pt-1">
						~ {cookingTime} Minutes
					</p>
				</div>
				<div class="flex flex-col items-center">
					<Icon name="arrow-up-down-outline" class="h-10 w-10" />
					<p class="pt-1">
						{skillLevel}
					</p>
				</div>
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
