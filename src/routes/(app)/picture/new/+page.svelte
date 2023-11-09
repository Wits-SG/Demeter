<script lang="ts">
	import { goto } from '$app/navigation';
	//@ts-ignore
	import { v4 as uuidv4 } from 'uuid';
	import { fb_storage } from '$lib/firebase';
	import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
	import { userInfo } from '$lib/stores/user.store';
	import type { PageData } from './$types';

	export let data: PageData;

	let userId = data.userId;

	let description: string;
	let title: string;

	let picture: File;
	let pictureLocalUrl: any;

	const onFileSelected = (e: any) => {
		picture = e.target.files[0];
		let reader = new FileReader();
		reader.readAsDataURL(picture);
		reader.onload = (e) => {
			pictureLocalUrl = e.target?.result;
		};
	};

	let errorMessage: string = '';
	let hasError: boolean = false;

	function validateForm(): boolean {
		if (!description || !picture || !title) {
			errorMessage = 'Please fill in all required fields.';
			hasError = true;
			return false;
		}

		hasError = false;
		errorMessage = '';
		return true;
	}

	async function postPicture() {
		if (validateForm()) {
			const pictureId = uuidv4();
			const pictureImageRef = ref(fb_storage, `images/picture/${pictureId}.jpeg`);

			const postId = uuidv4();

			await uploadBytes(pictureImageRef, picture);

			const url = await getDownloadURL(pictureImageRef);
			await fetch('/picture/new', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					id: pictureId,
					postId: postId,
					userId: userId,
					title: title,
					description: description,
					url: url
				})
			});

			goto(`/picture/${pictureId}`);
		} else {
			// Display the error message
			errorMessage = 'Please fill in all required fields.';
			hasError = true;
		}
	}
</script>

<div class="w-full h-full flex flex-col gap-6 p-6">
	<h1 class="flex justify-center font-bold" style="font-size:45px;">Post a Photo</h1>
	{#if hasError}
		<p class="text-red-500 flex justify-center">{errorMessage}</p>
	{/if}
	<div class="flex flex-row gap-5">
		<!-- this is the start of the first column, which includes the title, description, photo-->
		<section class="flex flex-col items-center w-1/2 gap-5">
			<label class="text-lg font-bold" for="picture"> Select image: </label>

			<img class="w-fit" src={pictureLocalUrl} alt="None found" />
			<input
				type="file"
				id="picture"
				name="picture"
				accept="image/*"
				on:change={(e) => onFileSelected(e)} />
		</section>

		<section class="flex flex-col items-center w-1/2 gap-5">
			<label class="text-lg font-bold" for="title"> Recipe Title </label>

			<input
				bind:value={title}
				class="p-1 w-full text-black rounded-md focus:outline-none focus:outline-2 focus:outline-emerald-500"
				maxlength="64"
				type="text"
				placeholder="Write a title..." />

			<label class="text-lg font-bold" for="description"> Caption </label>

			<textarea
				bind:value={description}
				class="block w-full h-fit dark:text-black rounded-md focus:outline-none focus:outline-2 focus:outline-emerald-500"
				id="decription"
				rows="4"
				maxlength="256"
				placeholder="Write a caption..." />

			<button
				class="h-10 w-48 items-center justify-center flex flex-row gap-1 rounded-lg border-2 border-emerald-500 dark:bg-emerald-700 bg-emerald-100 p-2 dark:hover:bg-emerald-800 hover:bg-emerald-300"
				on:click={postPicture}>
				Post
			</button>
		</section>
	</div>
</div>
