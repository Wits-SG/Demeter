<script lang="ts">
	import { onMount } from 'svelte';

	export let postID: string;
	let picturePreviewData: any;

	const getPreviewData = async () => {
		try {
			const picturePreview_res = await fetch(`/api/picture_post/preview?post_id=${postID}`, {
				method: 'GET'
			});

			const picture_data: JSON = await picturePreview_res.json();
			return picture_data;
		} catch (picturePreview_err: any) {
			console.error('Failed to fetch picture preview');
		}
	};

	let pictureID = 'NONE';
	let pictureTitle = 'NONE';
	let pictureImageURL =
		'https://previews.123rf.com/images/solarus/solarus2112/solarus211200026/178493166-default-image-icon-vector-missing-picture-page-for-website-design-or-mobile-a0pp-no-photo-available.jpg';
	let pictureDescription = 'NONE';
	let userId = 'NONE';
	let userDisplayName = 'NONE';

	const updateData = async () => {
		picturePreviewData = await getPreviewData();
		pictureID = picturePreviewData.picture.pictureID;
		pictureTitle = picturePreviewData.picture.name;
		pictureDescription = picturePreviewData.picture.description;
		pictureImageURL = picturePreviewData.picture.imageURL;
		userId = picturePreviewData.user.id;
		userDisplayName = picturePreviewData.user.displayName;
	};
</script>

<div class="w-full h-full rounded-md shadow-md shadow-zinc-600 dark:shadow-zinc-300">
	{#await updateData()}
		<div class="w-full h-full flex flex-col justify-center items-center">
			<svg
				width="32"
				height="32"
				stroke="#fff"
				viewBox="0 0 32 32"
				xmlns="http://www.w3.org/2000/svg">
				<style>
					.spinner_V8m1 {
						transform-origin: center;
						animation: spinner_zKoa 2s linear infinite;
					}
					.spinner_V8m1 circle {
						stroke-linecap: round;
						animation: spinner_YpZS 1.5s ease-in-out infinite;
					}
					@keyframes spinner_zKoa {
						100% {
							transform: rotate(360deg);
						}
					}
					@keyframes spinner_YpZS {
						0% {
							stroke-dasharray: 0 150;
							stroke-dashoffset: 0;
						}
						47.5% {
							stroke-dasharray: 42 150;
							stroke-dashoffset: -16;
						}
						95%,
						100% {
							stroke-dasharray: 42 150;
							stroke-dashoffset: -59;
						}
					}
				</style>
				<g class="spinner_V8m1">
					<circle cx="12" cy="12" r="9.5" fill="none" stroke-width="3" />
				</g>
			</svg>
		</div>
	{:then undefined}
		<a href="/picture/{pictureID}" class="w-full h-full overflow-hidden flex flex-col gap-1">
			<img
				class="h-full w-full md:h-full md:w-full object-cover border-b-8 border-blue-500"
				src={pictureImageURL}
				alt="Dish" />

			<div class="flex flex-col justify-center items-start p-4 gap-2">
				<section class="h-fit w-full flex justify-between items-center">
					<a href="/profile/{userId}" class="italic text-sm text-neutral-500"
						>{userDisplayName}</a>
					<p class="italic text-sm text-neutral-500">Picture</p>
				</section>

				<section class="h-fit gap-2 flex flex-col justify-center items-start">
					<p
						class="flex flex-row items-center uppercase text-sm text-black dark:text-white font-semibold">
						{pictureTitle}
					</p>
					<p class="line-clamp-2 text-zinc-500 dark:text-zinc-300 text-sm">
						{pictureDescription}
					</p>
				</section>
			</div>
		</a>
	{/await}
</div>
