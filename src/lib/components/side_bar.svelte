<script lang="ts">
	import { slide } from 'svelte/transition';
	import {
		quintInOut,
		backInOut,
		quintOut,
		quintIn,
		sineIn,
		sineOut,
		backOut,
		circOut
	} from 'svelte/easing';
	let open = false;
	function slideInOut() {
		open = !open;
	}
</script>

<!-- version with emerald shadow-->
<!--{#if !open}
	<div class=" flex flex-col bg-zinc-100 dark:bg-zinc-800 w-20 h-full px-4 py-4  shadow-[0_20px_15px_5px_rgba(16,185,129,0.5)]" >
		<button on:click= {slideInOut} >
		  Open
		</button>
	</div>
	{:else}
		<div class="flex flex-col bg-zinc-100 dark:bg-zinc-800 w-80 h-full px-4 py-4 shadow-[0_20px_15px_5px_rgba(16,185,129,0.5)]">
			<button on:click= {slideInOut}>
				Open
			</button>
			<button >
				Home
		  	</button>
		</div>
{/if}-->

<!-- version with emerald border-->
<!--{#if !open}
<div class=" flex flex-col bg-zinc-100 dark:bg-zinc-800 w-20 h-full px-4 py-4 border-r-2 border-emerald-500" >
	<button on:click= {slideInOut} >
	  Open
	</button>
</div>
{:else}
	<div class="flex flex-col bg-zinc-100 dark:bg-zinc-800 w-80 h-full px-4 py-4 border-r-2 border-emerald-500">
		<button on:click= {slideInOut}>
			Open
		</button>
		<button >
			Home
		  </button>
	</div>
{/if} -->

<!-- version with zinc shadow-->
<!--{#if !open}
<div class=" flex flex-col bg-zinc-100 dark:bg-zinc-800 w-20 h-full px-4 py-4 shadow-[0_20px_15px_5px_rgba(113,113,122,0.5)] dark:shadow-[0_20px_15px_5px_rgba(228,228,231,0.5)]" >
	<button on:click= {slideInOut} >
	  Open
	</button>
</div>
{:else}
	<div class="flex flex-col bg-zinc-100 dark:bg-zinc-800 w-80 h-full px-4 py-4 shadow-[0_20px_15px_5px_rgba(113,113,122,0.5)] dark:shadow-[0_20px_15px_5px_rgba(228,228,231,0.5)]">
		<button on:click= {slideInOut}>
			Open
		</button>
		<button >
			Home
		  </button>
	</div>
{/if}-->

<!-- version differnt color with zinc shadow-->
{#if !open}
	<div
		class=" flex flex-col bg-zinc-800 dark:bg-zinc-500 w-20 h-full px-4 py-4 dark:shadow-[0_14px_15px_8px_rgba(212,212,216,0.5)] shadow-[0_14px_15px_5px_rgba(39,39,42,1)]">
		<button class="text-zinc-100 dark:text-zinc-800" on:click={slideInOut}> Open </button>
		<!-- Page routing buttons and avatar will go here-->
	</div>
{:else}
	<div
		class="flex flex-col bg-zinc-800 dark:bg-zinc-500 w-80 h-full px-4 py-4 dark:shadow-[0_14px_15px_8px_rgba(212,212,216,0.5)] shadow-[0_14px_15px_5px_rgba(39,39,42,1)]">
		<button class="text-zinc-100 dark:text-zinc-800" on:click={slideInOut}> Open </button>
		<!-- Page routing buttons and avatar will go here-->
		<button class="text-zinc-100 dark:text-zinc-800"> Home </button>
	</div>
{/if}
