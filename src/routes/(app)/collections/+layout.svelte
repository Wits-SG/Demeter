<script lang="ts">
	let onCookbooks = true;
	let onMenus = false;
</script>

<div
	class="w-full h-fit min-h-screen overflow-y-auto flex flex-row justify-start items-start gap-5 p-2">
	<div class="w-2/12 min-w-fit h-screen flex flex-col justify-start items-center p-2">
		{#if onCookbooks}
			<a
				href="/collections/cookbooks/"
				class="w-full text-left pb-2 p-1 border-b-2 border-cyan-500 hover:border-cyan-300"
				>Cookbooks</a>
		{:else}
			<a
				href="/collections/cookbooks/"
				on:click={() => {
					onCookbooks = true;
					onMenus = false;
				}}
				class="w-full text-left pb-2 p-1 border-b-2 hover:border-cyan-500">Cookbooks</a>
		{/if}

		{#if onMenus}
			<a
				href="/collections/menus/"
				class="w-full text-left pb-2 p-1 border-b-2 border-amber-500 hover:border-amber-300"
				>Menus</a>
		{:else}
			<a
				href="/collections/menus/"
				on:click={() => {
					onCookbooks = false;
					onMenus = true;
				}}
				class="w-full text-left pb-2 p-1 border-b-2 hover:border-amber-500">Menus</a>
		{/if}
	</div>

	<slot />
</div>
