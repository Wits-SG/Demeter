<script lang="ts">

</script>

<div class="w-screen h-screen bg-zinc-100 flex flex-col justify-center items-center gap-10">

    <h1 class="text-5xl font-serif no-underline">Welcome</h1>

    <div class="flex flex-col gap-3">
        <label for="email">Email</label>
        <input name="email" type="email" />

        <label for="password">Password</label>
        <input name="password" type="password" />
    </div>

    <section class="flex flex-col gap-1 w-1/5">
        <button class="p-5 bg-emerald-500 rounded-md w-full h-12 text-center text-white text-md flex justify-center items-center hover:bg-emerald-600">Login</button>
        <button class="p-5 bg-emerald-500 rounded-md w-full h-12 text-center text-white text-md flex justify-center items-center hover:bg-emerald-600">Sign Up</button>
    </section>

</div>
