import HttpService from "../services/HttpService";
class PostService {
  getAll(page, tag, query) {
    let url = "posts?page=" + page;
    if(tag){
      url +='&tag='+tag
    }
    if(query){
      url +='&query='+query
    }
    return HttpService.get(url);
  }
  create(data) {
    return HttpService.post("posts", data);
  }
  detail(id) {
    return HttpService.get("posts/" + id);
  }
}
export default new PostService();
