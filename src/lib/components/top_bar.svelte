<script>
	import ZinclogoDark from '$lib/assets/images/Demeter_logo_Zinc_dark.png';
	import ZincLogoLight from '$lib/assets/images/Demeter_logo_Zinc_light (1).png';
</script>

<div
	class="bg-zinc-100 dark:bg-zinc-800 w-full h-full px-10 py-2 border-b-2 border-emerald-500 flex flex-row justify-between items-center">
	<img src={ZincLogoLight} class="h-auto w-16" alt="logo" />

	<input
		class="p-1 w-64 text-black dark:text-zinc-100 bg-zinc-100 dark:bg-zinc-800 rounded-md outline outline-1 outline-zinc-300 focuse:outline-0 focus:outline-2 focus:outline-emerald-500"
		placeholder="Search"
		type="search"
		name="search" />
</div>
