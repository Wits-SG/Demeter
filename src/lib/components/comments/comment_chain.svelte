<script lang="ts">
	import { userInfo } from '$lib/stores/user.store';
	import { Icon } from 'flowbite-svelte-icons';

	let currentUserId = $userInfo.userId;

	export let postId: string;
	export let commentId = 0;
	export let depth = 0;
	export let maxDepth = 1;
	let children: Array<number> = [];
	let userId: string = '';
	let displayName: string = '';
	let content: string = '';

	let showResponseText: boolean = false;

	const loadComment = async () => {
		// Fetch a comment

		const result = await fetch(`/api/comments?comment_id=${commentId}`);
		const json = await result.json();

		userId = json.userId;
		displayName = json.displayName;
		content = json.content;
		children = json.children;
	};

	let newCommentContent: string;
</script>

<div
	class="w-full h-full flex flex-col bg-zinc-200 dark:bg-neutral-800 border-l-2 rounded-md p-2 gap-2"
	class:border-red-500={depth == 0}
	class:border-green-500={depth == 1}
	class:border-blue-500={depth == 2}
	class:border-purple-500={depth == 3}
	class:border-yellow-500={depth == 4}
	class:border-orange-500={depth == 5}
	class:border-amber-500={depth == 6}
	class:border-lime-500={depth == 7}
	class:border-teal-500={depth == 8}
	class:border-cyan-500={depth == 9}
	class:border-sky-500={depth == 10}
	class:border-indigo-500={depth == 11}
	class:border-pink-500={depth == 12}
	class:border-rose-500={depth == 13}
	class:border-fuschia-500={depth == 14}>
	<!--Main Comment-->
	{#await loadComment()}
		<div class="w-full h-full flex flex-col justify-center items-start">
			<svg
				width="24"
				height="24"
				stroke="#fff"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg">
				<style>
					.spinner_V8m1 {
						transform-origin: center;
						animation: spinner_zKoa 2s linear infinite;
					}
					.spinner_V8m1 circle {
						stroke-linecap: round;
						animation: spinner_YpZS 1.5s ease-in-out infinite;
					}
					@keyframes spinner_zKoa {
						100% {
							transform: rotate(360deg);
						}
					}
					@keyframes spinner_YpZS {
						0% {
							stroke-dasharray: 0 150;
							stroke-dashoffset: 0;
						}
						47.5% {
							stroke-dasharray: 42 150;
							stroke-dashoffset: -16;
						}
						95%,
						100% {
							stroke-dasharray: 42 150;
							stroke-dashoffset: -59;
						}
					}
				</style>
				<g class="spinner_V8m1">
					<circle cx="12" cy="12" r="9.5" fill="none" stroke-width="3" />
				</g>
			</svg>
		</div>
	{:then undefined}
		<div class="w-full h-full flex flex-col justify-center items-start">
			<a href={`/profile/${userId}`} class="text-sm font-thin italic">{displayName}</a>
			<p class="">{content}</p>

			<section
				class="flex flex-row w-full h-full px-2 text-sm font-thin justify-start items-center gap-4">
				{#if showResponseText}
					<input
						class="p-1 w-full text-black rounded-md focuse:outline-none focus:outline-2 focus:outline-emerald-500"
						type="text"
						bind:value={newCommentContent} />
					<button
						class="flex flex-row justify-start items-center gap-1 dark:hover:bg-neutral-700 rounded-md p-1"
						on:click={async () => {
							const result = await fetch(`/api/comments`, {
								method: 'POST',
								body: JSON.stringify({
									postId,
									parentId: commentId,
									content: newCommentContent,
									userId: currentUserId,
									root: 0
								})
							});
							const data = await result.json();
							showResponseText = false;
							children = [...children, data.commentId];
						}}>Save</button>
					<button
						class="flex flex-row justify-start items-center gap-1 dark:hover:bg-neutral-700 rounded-md p-1"
						on:click={() => {
							showResponseText = false;
						}}>Cancel</button>
				{:else}
					<button
						class="flex flex-row justify-start items-center gap-1 dark:hover:bg-neutral-700 rounded-md p-1"
						on:click={() => {
							showResponseText = true;
						}}><Icon name="reply-outline" class="h-4 w-4" /> Reply</button>
				{/if}
			</section>
		</div>

		<!--Children-->
		<div class="w-full pl-2">
			{#if depth < maxDepth}
				{#each children as child}
					<svelte:self commentId={child} depth={depth + 1} {postId} />
				{/each}
			{/if}
		</div>
	{:catch _}
		<p>NO COMMENT FOUND</p>
	{/await}
</div>
