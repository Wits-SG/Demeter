<script lang="ts">
	import picture from '$lib/assets/pictures/penne-alla-vodka.jpg';
</script>

<div class="w-screen h-screen bg-zinc-100f lex flex-col items-center justify-center">
	<div class="green-bar bg-emerald-500 flex items-center justify-start">
		<div class="text-zinc-100 text-5xl font-serif text-left p-20">Logo goes here...</div>
	</div>

	<img class="object-fill" alt="" src={picture} height="300" width="200" />
</div>

<style>
	.green-bar {
		height: 140px;
		width: 100%;
	}
</style>
