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

	onMount(async () => {
		picturePreviewData = await getPreviewData();
		pictureID = picturePreviewData.picture.pictureID;
		pictureTitle = picturePreviewData.picture.name;
		pictureDescription = picturePreviewData.picture.description;
		pictureImageURL = picturePreviewData.picture.imageURL;
	});
</script>

<!--replace with page path-->
<a href="/" class="w-full">
	<div
		class="w-full h-full rounded-md shadow-md shadow-zinc-600 dark:shadow-zinc-300 overflow-hidden md:w-full md:h-full">
		<div class="md:flex md:flex-col">
			<img
				class="h-full w-full md:h-full md:w-full object-cover"
				src={pictureImageURL}
				alt="Dish" />
			<div class="p-4 h-2/5">
				<div
					class="mb-2 flex flex-row items-center uppercase text-sm text-zinc-800 dark:text-zinc-100 font-semibold">
					<Icon name="image-outline" class="h-8 w-8 p-2" />
					{pictureTitle}
				</div>
				<p class="line-clamp-2 mt-2 text-zinc-500 dark:text-zinc-300 text-sm">
					{pictureDescription}
				</p>
			</div>
		</div>
	</div>
</a>
