<script lang="ts">
	import { userInfo } from '$lib/stores/user.store';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	//@ts-ignore
	import { v4 as uuidv4 } from 'uuid';
	import { fb_storage } from '$lib/firebase';
	import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

	export let data: PageData;

	let userID: string = $userInfo.userId;
	//@ts-ignore
	let username: string = data.user.userName;
	//@ts-ignore
	let name: string = data.user.displayName;
	//@ts-ignore
	let bio: string = data.user.biography;

	let picture: File;

	//@ts-ignore
	let pictureLocalUrl: any;
	//@ts-ignore
	let pronounsId: number = data.user.pronounID - 1; // Database indexes count from 1, array's count from 0 => offset everything by -1

	const onFileSelected = (e: any) => {
		picture = e.target.files[0];
		let reader = new FileReader();
		reader.readAsDataURL(picture);
		reader.onload = (e) => {
			pictureLocalUrl = e.target?.result;
		};
	};

	// The onmount value loading should be in a +page file but it wouldn't work with the store
	onMount(() => {
		//@ts-ignore
		fetch(data.user.pictureUrl)
			.then((res) => res.blob())
			.then((blob) => (picture = new File([blob], 'original picture')));
	});

	const handleSave = async () => {
		try {
			const pictureId = uuidv4();
			const pictureImageRef = ref(fb_storage, `images/picture/${pictureId}.jpeg`);

			await uploadBytes(pictureImageRef, picture);

			const url = await getDownloadURL(pictureImageRef);
			console.log(pronounsId);
			await fetch('/api/user', {
				method: 'PUT',
				body: JSON.stringify({
					userId: data.user.userId,
					userName: username,
					displayName: name,
					biography: bio,
					pictureUrl: url,
					pronounsId: pronounsId + 1 // Database indexes count from 1, array's count from 0 => offset everything by -1
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
				<a
					href="/profile/{data.userId}"
					class="inline-flex h-8 items-center justify-center rounded-sm
				px-4 font-medium leading-none dark:text-white text-black border-2 border-emerald-500 bg-emerald-100 hover:bg-emerald-300 dark:bg-emerald-700 dark:hover:bg-emerald-900"
					on:click={handleSave}>
					Save
				</a>
			</section>
		</div>
	</div>
</div>
