<script lang="ts">
	import { Icon } from 'flowbite-svelte-icons';
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

	onMount(async () => {
		picturePreviewData = await getPreviewData();
		pictureID = picturePreviewData.picture.pictureID;
		pictureTitle = picturePreviewData.picture.name;
		pictureDescription = picturePreviewData.picture.description;
		pictureImageURL = picturePreviewData.picture.imageURL;
		userId = picturePreviewData.user.id;
		userDisplayName = picturePreviewData.user.displayName;
	});
</script>

<!--replace with page path-->
<a href="/picture/{pictureID}" class="w-full">
	<div
		class="w-full h-full rounded-md shadow-md shadow-zinc-600 dark:shadow-zinc-300 overflow-hidden flex flex-col gap-1">
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
	</div>
</a>
