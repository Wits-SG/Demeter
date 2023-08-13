<script lang="ts">
	import picture from '$lib/assests/pictures/penne-alla-vodka.jpg';
</script>

<div class="w-screen h-screen bg-zinc-100 flex-col items-center justify-center">
	<div class="green-bar bg-emerald-500 flex items-center justify-start">
		<div class="text-zinc-100 text-5xl font-serif text-left p-20">Logo goes here...</div>
	</div>

	<div class="flex justify-start items-start p-20 mx-60">
		<img alt="" src={picture} height="400" width="400" />
	</div>
</div>

<style>
	.green-bar {
		height: 140px;
		width: 100%;
	}
</style>
