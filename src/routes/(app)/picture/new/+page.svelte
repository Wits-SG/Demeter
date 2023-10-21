<script lang="ts">
	import { Icon } from 'flowbite-svelte-icons';
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';
	import { v4 as uuidv4 } from 'uuid';
	import { fb_storage } from '$lib/firebase';
	import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

	let caption: string;
	let title: string;

	let picture: File;
	let pictureLocalUrl: any;

	const onFileSelected = (e: any) => {
		picture = e.target.files[0];
		//console.log(picture instanceof File);
		let reader = new FileReader();
		reader.readAsDataURL(picture);
		reader.onload = (e) => {
			pictureLocalUrl = e.target?.result;
		};
	};

	let errorMessage: string = '';
	let hasError: boolean = false;

	function validateForm(): boolean {
		if (!caption || !picture || !title) {
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

			await uploadBytes(pictureImageRef, picture);

			const imageUrl = await getDownloadURL(pictureImageRef);

			await fetch('/picture/new', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					id: pictureId,
					title: title,
					description: caption,
					imageUrl: imageUrl
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
			<section class="container md:mx-auto w-3/4">
				<img class="w-fit w-fit" src={pictureLocalUrl} alt="None found" />
			</section>

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

			<label class="text-lg font-bold" for="caption"> Caption </label>

			<textarea
				bind:value={caption}
				class="block w-full h-fit dark:text-black rounded-md focus:outline-none focus:outline-2 focus:outline-emerald-500"
				id="decription"
				rows="4"
				maxlength="256"
				placeholder="Write a caption..." />

			<button
				class="w-72 h-12 rounded-md bg-emerald-500 hover:bg-emerald-400 dark:hover:bg-emerald-600"
				on:click={postPicture}>
				Post
			</button>
		</section>
	</div>
</div>
