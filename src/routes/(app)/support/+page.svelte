<script lang="ts">
	import {} from 'lucide-svelte';

	const items = [
		{
			id: 'item-1',
			title: 'What is Recipio?',
			description:
				'Recipio is a social media platform and recipe/food app that combines the features of a typical social media platform with a comprehensive food and recipe experience. It allows users to share their food-related experiences, discover new recipes, create cookbooks, connect with other users, and more.'
		},
		{
			id: 'item-2',
			title: 'How do I create an account?',
			description: `To create an account, simply click the profile avatar situated in top right-hand corner of the navigation bar (shown below). You\’ll be guided to the login page where you\’ll need to provide your email address and password. Once completed, you can start using Recipio.`
		},
		{
			id: 'item-3',
			title: 'How can I reset my password?',
			description:
				'On the login page, select “forgot password?”→ Enter you email address, and then select “Reset Password” → You will be sent an email with a link to a page titled: “Reset your password” → Enter your new password and click “Save” → Once completed you will be shown: “Password changed”. You can now sign in with your new password.'
		},
		{
			id: 'item-4',
			title: 'Is Recipio available on mobile devices?',
			description:
				'Recipio is currently only accessible on desktop computers. We do not have a mobile app available. However, you can still access Recipio via a web browser on your mobile device.'
		},
		{
			id: 'item-5',
			title: 'Is there light and dark mode viewing available?',
			description:
				'Yes, light and dark mode is available. You can toggle between light and dark mode using the daytime indicator button situated in the top right-hand corner of the navigation bar.'
		},
		{
			id: 'item-6',
			title: 'How do I navigate to the home page?',
			description:
				'To navigate to the home page from any point in the app, simply select the “Home” button situated in the top left-hand corner of the navigation bar. Or simply, click on the Recipio Logo in the top left corner to return to the home page.'
		},
		{
			id: 'item-7',
			title: 'Can I use Recipio without creating an account?',
			description:
				'You can browse and explore Recipio without an account, but to engage in all social media and recipe features, you’ll need to create an account.'
		},
		{
			id: 'item-8',
			title: 'How do I post a recipe?',
			description:
				'To post a new recipe, simple select “+ New Post” in the navigation bar. → Select “Create new recipe” → You will be take to a page titled: “Create your own Recipe” Fill in all the required information using the various dropdowns and textboxes, and select “Post” upon completion.'
		},
		{
			id: 'item-9',
			title: 'How do I create a Menu or Cookbook?',
			description:
				'To create a new Menu or Cookbook, select “Collections” in the navigation bar to be guided to the Cookbook and Menu page. → On the left-hand side of the page select either, “Cookbooks” or “Menus”. For Cookbooks select the “+” icon and fill in the “Cookbook Title” and “Cookbook Description” → select the save icon to complete. For Menus select the “+” icon and fill in the “Menu Title” and “Menu Description” → select the save icon to complete.'
		},
		{
			id: 'item-10',
			title: 'Where can I find my Menus and Cookbooks?',
			description:
				'To locate all Cookbooks and Menus → select the “Collections”  in the navigation bar to be guided to the Collections page.'
		},
		{
			id: 'item-11',
			title: 'How do I search for recipes?',
			description:
				'To search for a recipe → select “Search” in the navigation bar. → Enter what you are searching for in the search text box. → Select the search icon to the right of the textbox to initiate the search.'
		},
		{
			id: 'item-12',
			title: 'How do I post a picture?',
			description:
				'To post a new picture, simple select “+ New Post” in the navigation bar. → Select “Create new post” → You will be take to a page titled: “Post a Photo” Fill in all the required information using the textboxes and file selectors, and select “Post” upon completion.'
		},
		{
			id: 'item-13',
			title: `How do I leave comments on posts?`,
			description: `To leave a comment on a post, simply select \“Leave a comment\” → Type in the provided textbox → click \“Save\”. To cancel the comment, select \“Cancel\”.`
		},
		{
			id: 'item-14',
			title: 'How do I edit or update my user profile?',
			description:
				'To edit your profile select the profile avatar in top right-hand corner of the navigation bar to get to your profile. → Select “Edit Profile” → Make your necessary updates and then select “Save”.'
		},
		{
			id: 'item-15',
			title: 'Where can I view the profiles of other users?',
			description:
				'To view the profile of another user, select the username of the user who made the post. The username of the user will be displayed under the “Recipe Title” of a recipe post, and will be displayed under the “Picture Title” for a picture post. In both posts the username will be underlined.'
		}
	];
</script>

<div class="w-full h-full grid grid-cols-[2fr_1fr] grid-rows-[100px_1fr] overflow-hidden p-5">
	<div
		class="w-full h-full row-start-1 row-span-1 col-start-1 col-span-2 flex justify-center items-center">
		<h1 class="text-4xl">Support</h1>
	</div>

	<div
		class="w-full h-full row-start-2 row-span-1 col-start-1 col-span-1 max-h-full overflow-y-auto flex flex-col justify-start items-start gap-5">
		{#each items as item}
			<h1 class="font-bold underline underline-offset-1">{item.title}</h1>
			<p class="pl-5">{item.description}</p>
		{/each}
	</div>

	<div
		class="w-full h-full row-start-2 row-span-1 col-start-2 col-span-1 flex flex-col justify-start items-center gap-4">
		<h2 class="text-2xl">Feedback</h2>

		<p>Do you like using Recipio? Do you not like Recipio?</p>

		<a
			href="https://forms.gle/bkv54NmeonHGsoMK9"
			class="h-9 items-center justify-center flex flex-row gap-1 rounded-lg border-2 border-emerald-500 dark:bg-emerald-700 bg-emerald-100 p-2 dark:hover:bg-emerald-800 hover:bg-emerald-300"
			>Tell us why!</a>
	</div>
</div>
