import HttpService from "../services/HttpService";
class AuthService {

	login(data) {
		return HttpService.post("auth/login", data).then(res=>{
			localStorage.setItem('TOKEN', res.token);
			return res;
		});
	}
	register(data) {
		return HttpService.post("auth/register", data)
	}
	profile(){
		return HttpService.get("auth/profile")
	}
	logout(){
		localStorage.clear();
	}
	isLogin(){
		return localStorage.getItem("TOKEN");
	}
}
export default new AuthService();
