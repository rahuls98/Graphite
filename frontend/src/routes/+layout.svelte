<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import Navbar from '$lib/components/+navbar.svelte';
	import Sidenav from '$lib/components/+sidenav.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div data-sidebar-layout>
	<Navbar />
	<Sidenav />
	<main>
		{@render children()}
	</main>
</div>
