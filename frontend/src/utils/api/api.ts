const getAccessToken = (): string | null => {
	const cookies = document.cookie.split(';');
	const accessTokenCookie = cookies.find((cookie) =>
		cookie.trim().startsWith('accessToken=')
	);
	return accessTokenCookie ? accessTokenCookie.split('=')[1] : null;
};

const getHeaders = (withAuth: boolean = false): HeadersInit => {
	const headers: HeadersInit = {
		'Content-Type': 'application/json',
	};

	if (withAuth) {
		const token = getAccessToken();
		if (token) {
			headers['Authorization'] = `Bearer ${token}`;
		}
	}

	return headers;
};

const handleResponse = async (response: Response): Promise<any> => {
	if (!response.ok) {
		const error = await response.json().catch(() => ({}));
		throw new Error(error.message || `HTTP error! status: ${response.status}`);
	}

	return await response.json();
};