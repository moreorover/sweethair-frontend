<script>
	import { session } from '$app/stores';
	import { signOut as authSignOut } from 'sk-auth/client';
	// getting the user from the session store
	$: user = $session.user;
	$: ses = $session;

	function signIn() {
		location.assign('/api/auth/signin/cognito?redirect=/?redirect=/');
	}

	function signOut() {
		authSignOut().then(session.set);
	}
</script>

<svelte:head>
	<title>SvelteKit - Cognito</title>
</svelte:head>

{#if !user}
	<button on:click={signIn}>Log In with Cognito</button>
	<a href="/api/auth/signin/cognito?redirect=/">Cognito</a>
{:else}
	<h2>Welcome {user.email}!</h2>
	<p>Your username is {user.username} and your email has been verified: {user.email_verified}</p>
	<button on:click={signOut}>Log Out</button>
	<p>ses: {JSON.stringify(ses)}</p>
{/if}
