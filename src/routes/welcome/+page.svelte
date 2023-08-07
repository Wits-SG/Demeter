<script lang="ts">

    let email: String;
    let password_first: String = "";
    let password_second: String = "";

    let join_enabled: bool = false;

    $: {
        join_enabled = !(password_first == password_second && password_first != "" && email != "")
    }

    const join_on_press = () => {
        console.log(email, password_first, password_second);
    };

</script>

<div class="w-screen h-screen bg-zinc-100 flex flex-col justify-center items-center gap-10">

    <h1 class="text-5xl font-serif no-underline">Sign Up</h1>

    <div class="flex flex-col gap-3">
        <label for="email">Enter your email</label>
        <input name="email" type="email" bind:value={email}/>

        <label for="password-1">Enter your password</label>
        <input name="password-1" type="password" bind:value={password_first}/>

        <label for="password-1">Retype your password</label>
        <input name="password-1" type="password" bind:value={password_second}/>
    </div>
    
    <button class="p-5 bg-emerald-500 rounded-md w-1/5 h-12 text-center text-white text-md flex justify-center items-center hover:bg-emerald-600 disabled:bg-emerald-200"
        disabled={join_enabled}
        on:click={join_on_press}
    >Join</button>
</div>
