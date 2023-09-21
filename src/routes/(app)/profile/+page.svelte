<script lang="ts">
	import logo from '$lib/assets/images/pavs.jpg';

	let username: string = 'my_username';
	let name: string = 'My Name and Surname';
	let bio: string = 'This is an example of my bio, how cool blah blah blah';
	let pronouns: string = 'her/she';
</script>

<div class="w-full h-full flex flex-col gap-12 p-6">
	<div class="flex flex-row gap-20">
		<div class="flex flex-col items-end justify-end w-1/3 gap-10">
			<section>
				<img class="rounded-full" src={logo} alt="None found" width="200" height="200" />
			</section>
		</div>

		<div class="flex flex-col items-start justify-start w-1/2 gap-3">
			<section>
				<p style="font-size: 35px;">{username}</p>
			</section>

			<section>
				<p class="font-bold" style="font-size: 19px;">{name}</p>
			</section>

			<section>
				<p style="font-size: 18px;">{bio}</p>
			</section>

			<section>
				<p class="font-light" style="font-size: 18px;">{pronouns}</p>
			</section>

			<section>
				<button class="w-40 h-8 rounded-md bg-emerald-300"> Edit Profile </button>
			</section>
		</div>
	</div>
	<div class="flex flex-row justify-center">
		<p class="font-light" style="font-size: 18px;">POSTS</p>
	</div>
</div>
