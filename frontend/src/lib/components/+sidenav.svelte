<script>
	import { page } from '$app/stores';

	let sidenavItems = [
		{
			type: 'item',
			label: 'Dashboard',
			href: '/dashboard',
		},
		{
			type: 'item',
			label: 'Knowledge',
			href: '/knowledge',
		},
		{
			type: 'item',
			label: 'Explore',
			href: '/explore',
		},
		{
			type: 'group',
			label: 'Settings',
			hrefPrefix: '/settings',
			children: [
				{
					type: 'item',
					label: 'General',
					href: '/general',
				},
			],
		},
	];

	/** @param {string | undefined} value */
	function normalizePath(value) {
		const url = new URL(value || '/', 'http://localhost');
		const path = url.pathname;
		if (path.length > 1 && path.endsWith('/')) return path.slice(0, -1);
		return path;
	}

	/** @param {string | undefined} href */
	function isActive(href) {
		const currentPath = normalizePath($page.url.pathname);
		const hrefPath = normalizePath(href);

		if (hrefPath === '/') return currentPath === '/';
		return currentPath === hrefPath || currentPath.startsWith(`${hrefPath}/`);
	}

	/** @param {string | undefined} href */
	function getAriaCurrent(href) {
		return isActive(href) ? 'page' : undefined;
	}
</script>

<aside data-sidebar>
	<nav>
		<ul>
			{#each sidenavItems as sidenavItem}
				{#if sidenavItem.type === 'group'}
					<details open>
						<summary>{sidenavItem.label}</summary>
						<ul>
							{#each sidenavItem.children as childItem}
								<li>
									<a
										href={sidenavItem.hrefPrefix + childItem.href}
										aria-current={getAriaCurrent(childItem.href)}
										>{childItem.label}</a
									>
								</li>
							{/each}
						</ul>
					</details>
				{:else if sidenavItem.type === 'item'}
					<li>
						<a href={sidenavItem.href} aria-current={getAriaCurrent(sidenavItem.href)}
							>{sidenavItem.label}</a
						>
					</li>
				{/if}
			{/each}
		</ul>
	</nav>
</aside>
