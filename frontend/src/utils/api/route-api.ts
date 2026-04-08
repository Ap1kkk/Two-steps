import { CreateRouteData, RouteData, UpdateRouteData } from '../../types/route';

const API_URL = 'http://localhost:3001';

export const getAllRoutes = async () => {
	try {
		const response = await fetch(`${API_URL}/routes`, {
			method: 'GET',
			headers: getHeaders(),
		});
		return await handleResponse(response);
	} catch (error: any) {
		throw new Error(error.message || 'Ошибка загрузки маршрутов');
	}
};

export const getRouteByID = async (id: number): Promise<RouteData> => {
	try {
		const response = await fetch(`${API_URL}/routes/${id}`, {
			method: 'GET',
			headers: getHeaders(),
		});
		return await handleResponse(response);
	} catch (error: any) {
		throw new Error(error.message || 'Ошибка загрузки маршрута');
	}
};

export const createRoute = async (data: CreateRouteData): Promise<RouteData> => {
	try {
		const newRoute = {
			...data,
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
		};

		const response = await fetch(`${API_URL}/routes`, {
			method: 'POST',
			headers: getHeaders(),
			body: JSON.stringify(newRoute),
		});
		return await handleResponse(response);
	} catch (error: any) {
		throw new Error(error.message || 'Ошибка создания маршрута');
	}
};

export const updateRoute = async (id: number, data: UpdateRouteData): Promise<RouteData> => {
	try {
		const response = await fetch(`${API_URL}/routes/${id}`, {
			method: 'PATCH',
			headers: getHeaders(),
			body: JSON.stringify({
				...data,
				updatedAt: new Date().toISOString(),
			}),
		});
		return await handleResponse(response);
	} catch (error: any) {
		throw new Error(error.message || 'Ошибка обновления маршрута');
	}
};

export const deleteRoute = async (id: number): Promise<{ success: boolean; message: string }> => {
	try {
		const response = await fetch(`${API_URL}/routes/${id}`, {
			method: 'DELETE',
			headers: getHeaders(),
		});

		await handleResponse(response);
		return {
			success: true,
			message: 'Маршрут успешно удален',
		};
	} catch (error: any) {
		throw new Error(error.message || 'Ошибка удаления маршрута');
	}
};

export const getRoutesByCategory = async (categoryId: number): Promise<RouteData[]> => {
	try {
		const response = await fetch(`${API_URL}/routes?categories.id=${categoryId}`, {
			method: 'GET',
			headers: getHeaders(),
		});
		return await handleResponse(response);
	} catch (error: any) {
		throw new Error(error.message || 'Ошибка загрузки маршрутов по категории');
	}
};

export const getRoutesByDifficulty = async (difficulty: string): Promise<RouteData[]> => {
	try {
		const response = await fetch(`${API_URL}/routes?difficulty=${difficulty}`, {
			method: 'GET',
			headers: getHeaders(),
		});
		return await handleResponse(response);
	} catch (error: any) {
		throw new Error(error.message || 'Ошибка загрузки маршрутов по сложности');
	}
};
