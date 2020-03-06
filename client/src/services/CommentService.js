import HttpService from "../services/HttpService";
class CommentService {
  create(data) {
    return HttpService.post("comments", data);
  }
  
}
export default new CommentService();
