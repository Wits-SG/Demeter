<script lang="ts">
	import { userInfo } from '$lib/stores/user.store';
	import CommentChain from './comment_chain.svelte';
	import { Icon } from 'flowbite-svelte-icons';

	let currentUserId = $userInfo.userId;

	export let postId: string;
	let rootComments: Array<number>;
	const initialMaxDepth = 2;

	let showResponseText: boolean = false;
	let showComments: boolean = true;

	let newCommentContent: string;

	const loadComments = async () => {
		const result = await fetch(`/api/comments/post?post_id=${postId}`);
		const data = await result.json();
		rootComments = data;
	};
</script>

<div class="w-full max-h-[70vh] flex flex-col items-center justify-center overflow-y-auto">
	{#await loadComments()}
		<div class="w-full h-full flex flex-col justify-center items-center">
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
		{#if showComments}
			{#if rootComments.length > 0}
				{#each rootComments as rc}
					<CommentChain commentId={rc} maxDepth={initialMaxDepth} {postId} />
				{/each}
			{:else}
				<p>It's rather lonely here? Be the first to say something!</p>
			{/if}
		{/if}
	{:catch _}
		<p>ERROR: Please refresh the page to try again</p>
	{/await}

	<div
		class="w-full h-12 p-2 border-t-2 dark:border-white border-black flex flex-row items-center justify-evenly sticky bottom-0 bg-zinc-100 dark:bg-zinc-800">
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
							parentId: null,
							content: newCommentContent,
							userId: currentUserId,
							root: 1
						})
					});
					const data = await result.json();
					showResponseText = false;
					rootComments = [...rootComments, data.commentId];
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
					showComments = !showComments;
				}}
				><Icon name="messages-outline" class="h-6 w-6" />{showComments
					? 'Hide comments'
					: 'Show comments'}</button>
			<button
				class="flex flex-row justify-start items-center gap-1 dark:hover:bg-neutral-700 rounded-md p-1"
				on:click={() => {
					showResponseText = true;
				}}><Icon name="reply-outline" class="h-6 w-6" />Leave a comment</button>
		{/if}
	</div>
</div>
