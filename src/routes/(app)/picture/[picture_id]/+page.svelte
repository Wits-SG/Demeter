<script lang="ts">
	import { Icon } from 'flowbite-svelte-icons';
	import { createSeparator, melt, type CreateSeparatorProps } from '@melt-ui/svelte';
	import picture from '$lib/assets/images/penne-alla-vodka.jpg';
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
	class="w-full h-full bg-zinc-100 dark:bg-zinc-800 flex flex-col justify-center gap-15 pt-5 overflow-y-scroll">
	<div class="flex flex-row justify start items-start gap-2">
		<!-- picture section -->
		<section class="flex flex-col items-center justify-center w-1/2 gap-5">
			<section>
				<h1 class="text-4xl font-serif dark:text-white text-black">
					{data.picture.title}
				</h1>
			</section>
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
		<div use:melt={$vertical} class="h-full w-[4px] bg-emerald-500" />

		<!-- comments section -->
		<section class="flex flex-col items-center justify-center w-1/2 gap-5">
			<section>
				<!-- <h1 class="text-4xl font-serif">
					Comments
				</h1> -->
			</section>
		</section>
	</div>
</div>
