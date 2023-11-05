<script lang="ts">
	import {} from 'lucide-svelte';
</script>

<div class="w-full h-full grid grid-cols-[2fr_1fr] grid-rows-[100px_1fr] overflow-hidden p-5">
	<div
		class="w-full h-full row-start-1 row-span-1 col-start-1 col-span-2 flex justify-center items-center">
		<h1 class="text-4xl">Support</h1>
	</div>

	<div
		class="w-full h-full row-start-2 row-span-1 col-start-1 col-span-1 max-h-full overflow-y-auto flex flex-col justify-start items-center">
		<h2 class="text-2xl">FAQ</h2>
	</div>

	<div
		class="w-full h-full row-start-2 row-span-1 col-start-2 col-span-1 flex flex-col justify-start items-center gap-4">
		<h2 class="text-2xl">Feedback</h2>

		<p>Do you like using Recipio? Do you not like Recipio?</p>

		<a
			href="https://forms.gle/bkv54NmeonHGsoMK9"
			class="h-9 items-center justify-center flex flex-row gap-1 rounded-lg border-2 border-emerald-500 dark:bg-emerald-700 bg-emerald-100 p-2 dark:hover:bg-emerald-800 hover:bg-emerald-300"
			>Tell us why!</a>
	</div>
</div>
