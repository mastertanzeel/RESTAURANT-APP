import jwt_decode from 'jwt-decode';
const AUTH_TOKEN = 'auth-token';

export const getToken = () => localStorage.getItem(AUTH_TOKEN);
export const setToken = token => localStorage.setItem(AUTH_TOKEN, token);
export const deleteToken = () => localStorage.removeItem(AUTH_TOKEN);

export const setTokenAsync = async token => {
	return new Promise((resolve, reject) => {
		try {
			localStorage.setItem(AUTH_TOKEN, token);
			console.log(decodeToken(token))
			resolve(true)
		} catch (err) {
			reject(err)
		}
	})
}

export const decodeToken = (token) => {
	try {
		var decoded = jwt_decode(token);
		return decoded;
	} catch (err) {
		// JWT is malformed delete it and throw err.
		deleteToken();
		throw new Error('Villa kom upp.');
	}
}

export const isAuthenticated = () => {
	try {
		let token = getToken();
		if (!!token) {
			// Try and decode token to check if it is malformed or not.
			decodeToken(token);
			return true;
		}
		return false;
	} catch (err) {
		return false
	}
}
