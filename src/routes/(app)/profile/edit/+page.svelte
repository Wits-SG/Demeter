<script lang="ts">
	import { userInfo } from '$lib/stores/user.store';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	let username: string;
	let name: string;
	let bio: string;
	let picture: File;
	let pictureLocalUrl: any;
	let pronounsId: number;

	const onFileSelected = (e: any) => {
		picture = e.target.files[0];
		let reader = new FileReader();
		reader.readAsDataURL(picture);
		reader.onload = (e) => {
			pictureLocalUrl = e.target?.result;
		};
	};

	// The onmount value loading should be in a +page file but it wouldn't work with the store
	onMount(async () => {
		const result = await fetch(`/api/user?user_id=${$userInfo.userId}`);
		try {
			const json = await result.json();

			username = json['userName'];
			name = json['displayName'];
			bio = json['biography'];
			pictureLocalUrl = json['pictureUrl'];
			pronounsId = json['pronounId'];
		} catch (e: any) {
			console.error(e);
		}
	});

	const handleSave = async () => {
		try {
			await fetch('/api/user', {
				method: 'PUT',
				body: JSON.stringify({
					userId: $userInfo.userId,
					userName: username,
					displayName: name,
					biography: bio,
					pictureUrl: '',
					pronounsId: pronounsId
				})
			});
		} catch (e: any) {
			console.error(e); // This should have some sort of visual error handling
		}
	};
</script>

<div class="w-full h-full flex flex-col gap-12 p-6">
	<div class="flex flex-row gap-20">
		<div class="flex flex-col items-end justify-end w-1/3 gap-10">
			<section class="w-96 h-96 rounded-full overflow-hidden">
				<img alt="" src={pictureLocalUrl} class="w-full h-full object-cover" />
			</section>
			<section>
				<input
					type="file"
					id="picture"
					name="picture"
					accept="image/*"
					on:change={(e) => onFileSelected(e)} />
			</section>
		</div>

		<div class="flex flex-col items-start justify-start w-1/2 gap-3">
			<section class="w-1/2">
				<label class="text-lg" for="username"> Username </label>

				<input
					bind:value={username}
					class="p-1 w-full text-black rounded-md focus:outline-none focus:outline-2 focus:outline-emerald-500"
					maxlength="32"
					type="text"
					placeholder="username" />
			</section>

			<section class="w-1/2">
				<label class="text-lg" for="name"> Name </label>

				<input
					bind:value={name}
					class="p-1 w-full text-black rounded-md focus:outline-none focus:outline-2 focus:outline-emerald-500"
					maxlength="64"
					type="text"
					placeholder="display name" />
			</section>

			<section class="w-1/2">
				<label class="text-lg" for="bio"> Bio </label>

				<textarea
					bind:value={bio}
					class="block w-full h-fit dark:text-black rounded-md focus:outline-none focus:outline-2 focus:outline-emerald-500"
					id="bio"
					rows="4"
					maxlength="128"
					placeholder="a short biography" />
			</section>

			<section class="flex flex-col">
				<label class="text-lg" for="username"> Pronouns </label>

				<select
					id="pronouns"
					class="p-1 w-fit text-black rounded-md focus:outline-none focus:outline-2 focus:outline-emerald-500"
					bind:value={pronounsId}>
					{#each data.pronouns as pronoun, index}
						<option value={index}>{pronoun}</option>
					{/each}
				</select>
			</section>

			<section>
				<button class="w-40 h-8 rounded-md bg-emerald-300" on:click={handleSave}>
					Save
				</button>
			</section>
		</div>
	</div>
</div>
