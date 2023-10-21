<script lang="ts">
	import { Icon } from 'flowbite-svelte-icons';
	import { createSeparator, melt, type CreateSeparatorProps } from '@melt-ui/svelte';
	import picture from '$lib/assets/images/penne-alla-vodka.jpg';

	const {
		elements: { root: vertical }
	} = createSeparator({
		orientation: 'vertical',
		decorative: true
	});

	let pictureTitle = 'A new picture post';
	let pictureDescription = 'This is a test for the picture post.';
</script>

<div class="w-full h-full bg-zinc-100 dark:bg-zinc-800 flex flex-col justify-center gap-15 pt-5">
	<div class="flex flex-row justify start items-start gap-2">
		<!-- picture section -->
		<section class="flex flex-col items-center justify-center w-1/2 gap-5">
			<section>
				<h1 class="text-4xl font-serif">
					{pictureTitle}
				</h1>
			</section>
			<section class="container sm:mx-auto w-1/2">
				<img alt="" src={picture} class="object-cover rounded-xl" />
			</section>
			<section>
				<p class="text-lg">
					{pictureDescription}
				</p>
			</section>
		</section>
	</div>
</div>
