<script lang="ts">
	import GraphViewer from '$lib/components/+graph-viewer.svelte';
	import type { GraphLink, GraphNode } from '$lib/types/graph';

	const nodes: GraphNode[] = [
		{ id: 'auth_doc', type: 'document', cluster: 'auth', label: 'Auth Docs' },
		{ id: 'login', type: 'section', cluster: 'auth', label: 'Login Flow' },
		{ id: 'jwt', type: 'entity', cluster: 'auth', label: 'JWT' },
		{ id: 'oauth', type: 'entity', cluster: 'auth', label: 'OAuth2' },
		{ id: 'api', type: 'entity', cluster: 'shared', label: 'API' },
		{ id: 'security', type: 'entity', cluster: 'shared', label: 'Security' },
		{ id: 'pay_doc', type: 'document', cluster: 'payments', label: 'Payments Docs' },
		{ id: 'checkout', type: 'section', cluster: 'payments', label: 'Checkout' },
		{ id: 'stripe', type: 'entity', cluster: 'payments', label: 'Stripe API' },
		{ id: 'webhook', type: 'entity', cluster: 'payments', label: 'Webhook' },
	];

	const links: GraphLink[] = [
		{ source: 'auth_doc', target: 'login' },
		{ source: 'login', target: 'jwt' },
		{ source: 'login', target: 'oauth' },
		{ source: 'jwt', target: 'security' },
		{ source: 'pay_doc', target: 'checkout' },
		{ source: 'checkout', target: 'stripe' },
		{ source: 'stripe', target: 'webhook' },
		{ source: 'stripe', target: 'api' },
		{ source: 'oauth', target: 'api' },
		{ source: 'webhook', target: 'security' },
	];
</script>

<svelte:head>
	<link rel="stylesheet" href="/pages/knowledge-network.css" />
</svelte:head>

<div id="knowledge-network-container">
	<GraphViewer {nodes} {links} />
</div>
