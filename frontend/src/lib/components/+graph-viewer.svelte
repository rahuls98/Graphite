<script lang="ts">
	import {
		forceSimulation,
		forceLink,
		forceManyBody,
		forceCenter,
		forceX,
		forceY,
	} from 'd3-force';

	import { select, type Selection } from 'd3-selection';
	import { zoom } from 'd3-zoom';
	import { drag } from 'd3-drag';
	import type { D3GraphLink, D3GraphNode, GraphLink, GraphNode } from '$lib/types/graph';

	type GraphViewerProps = {
		nodes: GraphNode[];
		links: GraphLink[];
		loadDelayMs?: number;
		nodeRadius?: number;
		linkDistance?: number;
		chargeStrength?: number;
		clusterForceStrength?: number;
		yForceStrength?: number;
		zoomExtent?: [number, number];
		getNodeColor?: (node: GraphNode) => string;
		getClusterX?: (node: GraphNode, width: number) => number;
		onNodeClick?: (node: GraphNode) => void;
		clusterSpread?: number;
		linkColor?: string;
		linkOpacity?: number;
		resizeDebounceMs?: number;
	};

	let {
		nodes,
		links,
		loadDelayMs = 3000,
		nodeRadius = 10,
		linkDistance = 100,
		chargeStrength = -180,
		clusterForceStrength = 0.45,
		yForceStrength = 0.05,
		zoomExtent = [0.5, 3],
		getNodeColor = defaultNodeColor,
		getClusterX,
		onNodeClick,
		clusterSpread = 0.3,
		linkColor = '#ccc',
		linkOpacity = 1,
		resizeDebounceMs = 180,
	}: GraphViewerProps = $props();

	let svgEl = $state<SVGSVGElement | undefined>(undefined);
	let isLoading = $state(true);
	let resizeTick = $state(0);
	let resizeDebounceTimer: ReturnType<typeof setTimeout> | undefined;
	let loadDelayTimer: ReturnType<typeof setTimeout> | undefined;

	function defaultNodeColor(node: GraphNode) {
		const palette = ['#8B1A10', '#1A4D8B', '#2E7D32', '#6D4C41', '#5E548E', '#C06C00'];
		const source = node.cluster || node.type || node.id;
		let hash = 0;
		for (let i = 0; i < source.length; i += 1) {
			hash = (hash << 5) - hash + source.charCodeAt(i);
			hash |= 0;
		}
		return palette[Math.abs(hash) % palette.length];
	}

	function buildClusterXResolver(graphNodes: GraphNode[], graphWidth: number, spread: number) {
		const clusters = Array.from(
			new Set(graphNodes.map((node) => node.cluster).filter(Boolean)),
		) as string[];
		if (clusters.length === 0) {
			return () => graphWidth * 0.5;
		}

		const normalizedSpread = Math.max(0.1, Math.min(1, spread));
		const marginRatio = (1 - normalizedSpread) / 2;
		const start = graphWidth * marginRatio;
		const end = graphWidth * (1 - marginRatio);
		const step = clusters.length > 1 ? (end - start) / (clusters.length - 1) : 0;

		const positions = new Map<string, number>();
		clusters.forEach((cluster, index) => {
			positions.set(cluster, start + index * step);
		});

		return (node: GraphNode) => {
			if (!node.cluster) return graphWidth * 0.5;
			return positions.get(node.cluster) ?? graphWidth * 0.5;
		};
	}

	function getResolveClusterX(graphWidth: number) {
		if (getClusterX) {
			return (node: GraphNode) => getClusterX(node, graphWidth);
		}

		const defaultClusterX = buildClusterXResolver(nodes, graphWidth, clusterSpread);
		return (node: GraphNode) => defaultClusterX(node);
	}

	function attachZoom(
		svg: Selection<SVGSVGElement, unknown, null, undefined>,
		g: Selection<SVGGElement, unknown, null, undefined>,
	) {
		svg.call(
			zoom<SVGSVGElement, unknown>()
				.scaleExtent(zoomExtent)
				.on('zoom', (event) => {
					g.attr('transform', event.transform);
				}),
		);
	}

	function createGraphSimulation(
		simulationNodes: D3GraphNode[],
		simulationLinks: D3GraphLink[],
		resolveClusterX: (node: GraphNode) => number,
		width: number,
		height: number,
	) {
		return forceSimulation<D3GraphNode>(simulationNodes)
			.force(
				'link',
				forceLink<D3GraphNode, D3GraphLink>(simulationLinks)
					.id((d) => d.id)
					.distance(linkDistance),
			)
			.force('charge', forceManyBody().strength(chargeStrength))
			.force('center', forceCenter(width / 2, height / 2))
			.force(
				'x',
				forceX<D3GraphNode>((d) => resolveClusterX(d)).strength(clusterForceStrength),
			)
			.force('y', forceY(height / 2).strength(yForceStrength));
	}

	function renderGraph(el: SVGSVGElement, width: number, height: number) {
		const simulationNodes: D3GraphNode[] = nodes.map((node) => ({ ...node }));
		const simulationLinks: D3GraphLink[] = links.map((link) => ({ ...link }));
		const resolveClusterX = getResolveClusterX(width);

		const svg = select(el);
		svg.selectAll('*').remove();

		const g = svg.append('g');
		attachZoom(svg, g);

		const simulation = createGraphSimulation(
			simulationNodes,
			simulationLinks,
			resolveClusterX,
			width,
			height,
		);

		const link = g
			.append('g')
			.selectAll<SVGLineElement, D3GraphLink>('line')
			.data(simulationLinks)
			.join('line')
			.attr('stroke', linkColor)
			.attr('stroke-opacity', linkOpacity);

		const node = g
			.append('g')
			.selectAll<SVGCircleElement, D3GraphNode>('circle')
			.data(simulationNodes)
			.join('circle')
			.attr('r', nodeRadius)
			.attr('fill', (d) => getNodeColor(d))
			.call(
				drag<SVGCircleElement, D3GraphNode>()
					.on('start', (event, d) => {
						if (!event.active) simulation.alphaTarget(0.3).restart();
						d.fx = d.x;
						d.fy = d.y;
					})
					.on('drag', (event, d) => {
						d.fx = event.x;
						d.fy = event.y;
					})
					.on('end', (event, d) => {
						if (!event.active) simulation.alphaTarget(0);
						d.fx = null;
						d.fy = null;
					}),
			)
			.on('click', (_, d) => {
				onNodeClick?.(d);
			});

		simulation.on('tick', () => {
			link.attr('x1', (d) => (d.source as D3GraphNode).x!)
				.attr('y1', (d) => (d.source as D3GraphNode).y!)
				.attr('x2', (d) => (d.target as D3GraphNode).x!)
				.attr('y2', (d) => (d.target as D3GraphNode).y!);

			node.attr('cx', (d) => d.x!).attr('cy', (d) => d.y!);
		});

		return () => {
			simulation.stop();
			svg.selectAll('*').remove();
		};
	}

	$effect(() => {
		if (loadDelayTimer) {
			clearTimeout(loadDelayTimer);
		}

		isLoading = true;
		loadDelayTimer = setTimeout(() => {
			isLoading = false;
		}, loadDelayMs);

		return () => {
			if (loadDelayTimer) {
				clearTimeout(loadDelayTimer);
			}
		};
	});

	$effect(() => {
		if (!svgEl) return;
		resizeTick;
		const el = svgEl;

		const vw = el.clientWidth;
		const vh = el.clientHeight;
		if (vw <= 0 || vh <= 0) return;

		return renderGraph(el, vw, vh);
	});

	$effect(() => {
		if (!svgEl) return;
		const el = svgEl;
		let lastWidth = el.clientWidth;
		let lastHeight = el.clientHeight;

		const observer = new ResizeObserver(() => {
			const nextWidth = el.clientWidth;
			const nextHeight = el.clientHeight;
			if (nextWidth === lastWidth && nextHeight === lastHeight) return;
			lastWidth = nextWidth;
			lastHeight = nextHeight;

			if (resizeDebounceTimer) {
				clearTimeout(resizeDebounceTimer);
			}
			resizeDebounceTimer = setTimeout(() => {
				resizeTick += 1;
			}, resizeDebounceMs);
		});
		observer.observe(el);
		return () => {
			observer.disconnect();
			if (resizeDebounceTimer) {
				clearTimeout(resizeDebounceTimer);
			}
		};
	});
</script>

<div id="graph-viewer-container">
	{#if isLoading}
		<div aria-busy="true" data-spinner="large"></div>
	{:else}
		<svg bind:this={svgEl}></svg>
	{/if}
</div>

<style>
	#graph-viewer-container {
		height: 100%;
		width: 100%;
		display: grid;
		place-items: center;
	}

	#graph-viewer-container svg {
		width: 100%;
		height: 100%;
	}
</style>
