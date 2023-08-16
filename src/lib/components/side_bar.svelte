<script lang="ts">
	let open = false;
	function slideInOut() {
		open = !open;
	}
</script>

<!-- version with zinc shadow-->
{#if !open}
	<div
		class=" flex flex-col bg-zinc-100 dark:bg-zinc-800 w-20 h-full px-4 py-4 shadow-[0_20px_15px_5px_rgba(113,113,122,0.5)] dark:shadow-[0_20px_15px_5px_rgba(228,228,231,0.5)]">
		<button on:click={slideInOut}> Open </button>
		<!--Page routing buttons and avatar will go here-->
	</div>
{:else}
	<div
		class="flex flex-col bg-zinc-100 dark:bg-zinc-800 w-60 h-full px-4 py-4 shadow-[0_20px_15px_5px_rgba(113,113,122,0.5)] dark:shadow-[0_20px_15px_5px_rgba(228,228,231,0.5)]">
		<button on:click={slideInOut}> Open </button>
		<!--Page routing buttons and avatar will go here-->
		<button> Home </button>
	</div>
{/if}
