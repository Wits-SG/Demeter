<script lang="ts">
	import { Icon } from 'flowbite-svelte-icons';

	let username: string;
	let name: string;
	let bio: string;

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
					class="p-1 w-fit text-black rounded-md focus:outline-none focus:outline-2 focus:outline-emerald-500">
					<option value="1">she/her</option>
					<option value="2">he/him</option>
					<option value="3">they/them</option>
					<option value="4">prefer not to say</option>
				</select>
			</section>

			<section>
				<button class="w-40 h-8 rounded-md bg-emerald-300"> Save </button>
			</section>
		</div>
	</div>
</div>
