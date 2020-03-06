import axios from "axios";
import { handlerSuccess, handlerError } from "../utils";
class HttpService {
	constructor() {
		this.client = axios.create({
			baseURL: 'http://localhost:4000/api',
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json"
			}
		});
	}
	get(url) {
		this.setHeaderAuthentication()
		return this.client
			.get(url)
			.then(handlerSuccess)
			.catch(handlerError);
	}
	post(url, data) {
		this.setHeaderAuthentication()
		return this.client
			.post(url, data)
			.then(handlerSuccess)
			.catch(handlerError);
	}
	put(url, data) {
		this.setHeaderAuthentication()
		return this.client
			.put(url, data)
			.then(handlerSuccess)
			.catch(handlerError);
	}
	delete(url) {
		this.setHeaderAuthentication()
		return this.client
			.delete(url)
			.then(handlerSuccess)
			.catch(handlerError);
	}

	setHeaderAuthentication() {
		const tokenCookie = localStorage.getItem('TOKEN');
		if (tokenCookie) {
			this.client.defaults.headers["Authorization"] = `Bearer ${tokenCookie}`;
		}
	}
	
}
export default new HttpService();
