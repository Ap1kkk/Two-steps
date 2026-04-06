export interface Category {
	id: number;
	name: string;
}

export interface Route {
	id: number;
	name: string;
	imagePath: string;
	distance: number;
	difficulty: 'EASY' | 'MEDIUM' | 'HARD';
	categories: Category[];
}

export interface Checkpoint {
	latitude: number;
	longitude: number;
	orderNumber?: number;
}

export interface RouteData {
	id: number;
	nameRoute: string;
	distance: number;
	difficulty: string;
	checkpoints: Checkpoint[];
	categories?: Category[];
}

export interface CreateRouteData {
	nameRoute: string;
	distance: number;
	difficulty: string;
	checkpoints: Checkpoint[];
	categories?: number[];
}

export interface UpdateRouteData {
	id?: number;
	nameRoute?: string;
	distance?: number;
	difficulty?: string;
	checkpoints?: Checkpoint[];
	categories?: number[];
}

export interface RouteMapProps {
	routeData?: RouteData | null;
	userLocation?: [number, number] | null;
	onMapLoad?: (ymaps: any, map: any) => void;
	className?: string;
	showUserMarker?: boolean;
	showRoute?: boolean;
	height?: string | number;
}
