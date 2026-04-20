import type { SimulationLinkDatum, SimulationNodeDatum } from 'd3-force';

export type NodeType = string;

export interface GraphNode {
	id: string;
	label: string;
	type?: NodeType;
	cluster?: string;
}

export interface GraphLink {
	source: string;
	target: string;
}

export interface D3GraphNode extends GraphNode, SimulationNodeDatum {}

export interface D3GraphLink extends SimulationLinkDatum<D3GraphNode> {
	source: string | D3GraphNode;
	target: string | D3GraphNode;
}
