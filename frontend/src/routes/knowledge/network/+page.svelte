<script lang="ts">
	import GraphViewer from '$lib/components/+graph-viewer.svelte';
	import { nodes, links } from './data';
	
</script>

<div id="knowledge-network-container">
	<GraphViewer {nodes} {links} />
</div>

<style>
	#knowledge-network-container {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
	}
</style>
