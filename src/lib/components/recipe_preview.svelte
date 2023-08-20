<script>
	import dishPicture from '$lib/assets/images/pavs.jpg';
	import { Icon } from 'flowbite-svelte-icons';
</script>

<!--<div class="w-1/4 h-2/5 p-1 rounded-md shadow-md shadow-zinc-800 dark:shadow-zinc-500 dark:ring-zinc-100 ring-zinc-800">
    <img src={dishPicture} alt="dishPicture" class="w-full h-2/5 object-cover"/>

</div>-->

<!--<div class=" w-1/5 h-2/5 bg-zinc-100 dark:bg-zinc-800 border rounded-lg shadow-md shadow-zinc-800 dark:shadow-zinc-500 overflow-hidden">
    <img src={dishPicture} alt="dishPicture" class="w-full h-2/5 object-cover"/>
        <div class="p-2">
            <div class="flex items-baseline">
                <div class="ml-1 text-zinc-100 text-sm uppercase font-semibold tracking-wide">
                  Penne Alla Vodka
                </div>
              </div>
              <div class="m-2 grid grid-cols-3 items-center justify-center gap-3">
                <div class="flex flex-col items-center justify-center gap-1">
                    <Icon name="users-group-outline" class="h-3 w-3" />
                    <p class="text-xs">
                        4 Person
                    </p>
                </div>
                <div class="flex flex-col items-center justify center gap-1">
                    <Icon name="clock-outline" class="h-3 w-3" />
                    <p class="text-xs">
                        ~30 Mins
                    </p>
                </div>
                <div class="flex flex-col items-center justify center gap-1">
                    <Icon name="arrow-up-down-outline" class="h-3 w-3" />
                    <p class="text-xs">
                        Intermediate
                    </p>
                </div>
            </div>
        </div>
        w-1/4 h-2/5
</div>-->

<!--<div class="md:flex md:flex-col w-1/4 h-2/5 bg-zinc-100 dark:bg-zinc-800 border rounded-lg shadow-md shadow-zinc-800 dark:shadow-zinc-500 overflow-hidden">
    <img src={dishPicture} alt="dishPicture" class="w-full h-2/5 object-cover"/>
        <div class="p-2">
            <div class="flex flex-col">
                <div class="ml-1 text-zinc-800 Dark:text-zinc-100 text-base uppercase font-semibold tracking-wide">
                  Penne Alla Vodka
                </div>
                  <div class="m-1 grid grid-cols-3 items-center justify-center gap-0.25">
                    <div class="flex flex-col items-center justify-center gap-1">
                        <Icon name="users-group-outline" class="h-3 w-3" />
                        <p class="text-xs">
                            4 Person
                        </p>
                    </div>
                    <div class="flex flex-col items-center justify center gap-1">
                        <Icon name="clock-outline" class="h-3 w-3" />
                        <p class="text-xs">
                            ~30 Mins
                        </p>
                    </div>
                    <div class="flex flex-col items-center justify center gap-1">
                        <Icon name="arrow-up-down-outline" class="h-3 w-3" />
                        <p class="text-xs">
                            Intermediate
                        </p>
                    </div>
                </div>
              </div>
              <div class="m-1 flex flex-col items-center justify-start">
                <p class="sm:text-clip text-sm">
                    Penne alla Vodka is a classic Italian-American pasta dish known for its creamy tomato-based sauce with a touch of vodka. This indulgent recipe combines the richness of a velvety sauce with the bite of penne pasta, creating a comforting and flavorful dish that's perfect for a cozy dinner.   
                </p>
            </div>
        </div>
</div>-->

<div
	class="w-1/4 h-2/5 rounded-md shadow-md shadow-zinc-600 dark:shadow-zinc-300 overflow-hidden md:w-1/4 md:h-auto">
	<div class="md:flex md:flex-col">
		<img
			class="h-28 w-full md:h-48 md:w-full object-cover md:object-cover"
			src={dishPicture}
			alt="Dish" />
		<div class="p-4">
			<div class="mb-2 uppercase text-sm text-zinc-800 dark:text-zinc-100 font-semibold">
				Penne Alla Vodka
			</div>
			<div class="m-1 grid grid-cols-3 items-center justify-center gap-0.25">
				<div class="flex flex-col items-center justify-center gap-1">
					<Icon name="users-group-outline" class="h-3 w-3" />
					<p class="text-xs">4 Person</p>
				</div>
				<div class="flex flex-col items-center justify center gap-1">
					<Icon name="clock-outline" class="h-3 w-3" />
					<p class="text-xs">~30 Mins</p>
				</div>
				<div class="flex flex-col items-center justify center gap-1">
					<Icon name="arrow-up-down-outline" class="h-3 w-3" />
					<p class="text-xs">Intermediate</p>
				</div>
			</div>
			<p class="mt-2 text-zinc-500 dark:text-zinc-300 text-sm">
				Looking to take your team away on a retreat to enjoy awesome food and take in some
				sunshine? We have a list of places to do just that.
			</p>
		</div>
	</div>
</div>
