<script lang="ts">
	import { userInfo, userSignedIn } from '$lib/stores/user.store';
	import type { PageData } from './$types';
	import { fb_auth } from '$lib/firebase';
	import { goto } from '$app/navigation';

	export let data: PageData;
</script>

<div class="w-full h-full flex flex-col gap-12 p-6">
	<div class="flex flex-row gap-20">
		<div class="flex flex-col items-end justify-end w-1/3 gap-10">
			<section class="w-64 h-64 rounded-full overflow-hidden">
				<img alt="" src={data.user.pictureUrl} class="w-full h-full object-cover" />
			</section>
		</div>

		<div class="flex flex-col items-start justify-start w-1/2 gap-3">
			<section>
				<p class="text-3xl">{data.user.userName}</p>
			</section>

			<section>
				<p class="font-bold text-lg">{data.user.displayName}</p>
			</section>

			<section>
				<p class="text-lg md:max-w-lg">{data.user.biography}</p>
			</section>

			<section>
				<p class="font-light text-base">{data.user.pronouns}</p>
			</section>

			{#if data.user.userId == $userInfo.userId}
				<section>
					<button class="w-40 h-8 rounded-md bg-emerald-300 dark:text-black">
						Edit Profile
					</button>
					<button
						on:click={() => {
							fb_auth
								.signOut()
								.then(() => goto('/'))
								.catch((e) => console.error(e));
						}}
						class="w-40 h-8 rounded-md bg-emerald-300 dark:text-black">
						Logout
					</button>
				</section>
			{/if}
		</div>
	</div>
	<div class="flex flex-row justify-center">
		<p class="font-light text-lg">POSTS</p>
	</div>
</div>
