<script lang="ts">
	import { Icon } from 'flowbite-svelte-icons';
	import PostComments from '$lib/components/comments/post_comments.svelte';
	import { createSeparator, melt, type CreateSeparatorProps } from '@melt-ui/svelte';
	import type { PageData } from './$types';

	export let orientation: CreateSeparatorProps['orientation'] = 'vertical';

	const {
		elements: { root: vertical }
	} = createSeparator({
		orientation
	});

	export let data: PageData;
</script>

<div
	class="w-full h-full bg-zinc-100 dark:bg-zinc-800 flex flex-row justify-start items-center gap-2 py-5">
	<!-- picture section -->
	<section class="flex flex-col items-center justify-center w-full gap-5">
		<section>
			<h1 class="text-4xl font-serif dark:text-white text-black">
				{data.picture.title}
			</h1>
		</section>
		<a
			href={`/profile/${data.user.userID}`}
			class="text-lg font-thin italic underline underline-offset-1"
			>by {data.user.displayName}</a>
		<section class="container sm:mx-auto w-1/2">
			<img alt="" src={data.picture.url} class="object-cover rounded-xl" />
		</section>
		<section>
			<p class="text-lg dark:text-white text-black">
				{data.picture.description}
			</p>
		</section>
	</section>

	<!-- separator -->
	<div use:melt={$vertical} class="h-full w-[5px] bg-emerald-500" />

	<!-- comments section -->
	<section class="flex w-full max-h-screen h-fit justify-center items-center">
		<section class="w-2/3"><PostComments postId={data.picture.postId} /></section>
	</section>
</div>
