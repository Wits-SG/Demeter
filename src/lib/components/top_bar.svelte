<script>
	import logo from '$lib/assets/images/logo4.png';
</script>

<div
	class="bg-zinc-100 dark:bg-zinc-800 w-full h-20 mx-2 my-2 px-4 py-4 border-b-2 border-emerald-500 flex justify-between items-center">
	<img src={logo} class="h-auto w-36" alt="logo" />

	<h1 class="text-zinc-800 dark:text-zinc-100 text-6xl font-serif">Demeter</h1>

	<input
		class="p-1 w-64 text-black dark:text-zinc-100 bg-zinc-100 dark:bg-zinc-800 rounded-md outline outline-1 outline-zinc-300 focuse:outline-0 focus:outline-2 focus:outline-emerald-500"
		placeholder="Search"
		type="search"
		name="search" />
</div>
