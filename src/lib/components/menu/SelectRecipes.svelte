<script lang="ts">
	import { createSelect, melt } from '@melt-ui/svelte';
	import { Icon } from 'flowbite-svelte-icons';
	//THis will have all the recipes
	const options = {
		sweet: ['Caramel', 'Chocolate', 'Strawberry', 'Cookies & Cream'],
		savory: ['Basil', 'Bacon', 'Rosemary']
	};

	const {
		elements: { trigger, menu, option, group, groupLabel },
		states: { selectedLabel, open },
		helpers: { isSelected }
	} = createSelect({
		forceVisible: true,
		positioning: {
			placement: 'bottom',
			fitViewport: true,
			sameWidth: true
		},
		multiple: true
	});
</script>

<div class="flex flex-col gap-1">
	<button
		class="flex h-10 min-w-[220px] items-center justify-between rounded-lg bg-white px-3 py-2
    text-zinc-900 shadow transition-opacity hover:bg-teal-500"
		use:melt={$trigger}>
		{$selectedLabel || 'Select Recipes'}
		<Icon name="angle-down-outline" class="h-4 w-4" />
	</button>
	{#if $open}
		<div
			class="z-50 flex max-h-[300px] flex-col overflow-y-auto rounded-lg bg-white p-1"
			use:melt={$menu}>
			{#each Object.entries(options) as [key, arr]}
				<div use:melt={$group(key)}>
					<div
						class="py-1 pl-4 pr-4 font-semibold capitalize text-zinc-900"
						use:melt={$groupLabel(key)}>
						{key}
					</div>
					{#each arr as item}
						<div
							class="relative cursor-pointer rounded-lg py-1 pl-8 pr-4 text-zinc-900 focus:text-magnum-700
              data-[highlighted]:bg-magnum-50 data-[selected]:bg-magnum-100
              data-[highlighted]:text-magnum-900 data-[selected]:text-magnum-900"
							use:melt={$option({ value: item, label: item })}>
							<div class="check {$isSelected(item) ? 'block' : 'hidden'}">
								<Icon name="check-outline" class="h-4 w-4" />
							</div>

							{item}
						</div>
					{/each}
				</div>
			{/each}
		</div>
	{/if}
</div>
