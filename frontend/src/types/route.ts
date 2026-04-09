export interface Route {
	id: number;
	name: string;
	imagePath: string;
	distance: number;
	checkpoints: Checkpoint[];
	tags: Tag[];
}

export interface Tag {
	id: number;
	name: string;
}

export interface Checkpoint {
	latitude: number;
	longitude: number;
}

export interface CreateRouteData {
	name: string;
	distance: number;
	imagePath?: string;
	checkpoints: Checkpoint[];
	tagIds: number[];
}

export interface UpdateRouteData {
	id: number;
	name?: string;
	distance?: number;
	imagePath?: string;
	checkpoints?: Checkpoint[];
	tagIds?: number[];
}

export interface RouteFilters {
	name?: string;
	tagIds?: number[];
	minDistance?: number;
	maxDistance?: number;
	search?: string;
}

export interface RoutesResponse {
	data: Route[];
	total: number;
	page: number;
	limit: number;
}