import React, { Component } from "react";
import { connect } from "react-redux";
import { getPosts } from "../actions";
import * as moment from "moment";
import { Link } from "react-router-dom";
import Comments from "./Comments";
import Tags from "./Tags";
import queryString from "query-string";
import Highlight from "react-highlight";
import marked from "marked";
marked.setOptions({
  gfm: true,
  tables: true,
  breaks: true
});
class ListPost extends Component {
  // constructor(props) {
  //   super(props);
  // }
  getShortSumary(text){
    if(text.length>100){
      return text.substr(0, 100);
    }
    return text;
  }
  componentDidMount() {
    this.params = queryString.parse(this.props.location.search);
    this.props.getPosts(1, this.params.tag, this.params.q);
  }
  onPre = () => {
    this.props.getPosts(
      --this.props.posts.page,
      this.params.tag,
      this.params.q
    );
  };
  onNext = () => {
    this.props.getPosts(
      ++this.props.posts.page,
      this.params.tag,
      this.params.q
    );
  };
  render() {
    return (
      <>
        {this.props.posts &&
          this.props.posts.docs.map(post => {
            return (
              <div className="blog-post" key={post._id}>
                <h2 className="blog-post-title">
                  <Link to={`/posts/${post._id}`}>{post.title}</Link>
                </h2>
                <p className="blog-post-meta">
                  {moment(post.createdAt).format("MMM Do YYYY")} by{" "}
                  <a href="#">{post.owner.name}</a>
                </p>
                <Tags tags={post.tags}></Tags>
                <br />
                <Highlight innerHTML>{marked(this.getShortSumary(post.content))}</Highlight>

                <hr></hr>
                <Comments comments={post.comments}></Comments>
              </div>
            );
          })}
        {this.props.posts.totalPages > 1 && (
          <nav className="blog-pagination">
            <a
              className={
                `btn ` +
                (this.props.posts.hasPrevPage
                  ? "btn-outline-primary"
                  : "btn-outline-secondary disabled")
              }
              href="#"
              onClick={this.onPre}
            >
              Older
            </a>
            <a
              className={
                `btn ` +
                (this.props.posts.hasNextPage
                  ? "btn-outline-primary"
                  : "btn-outline-secondary disabled")
              }
              href="#"
              tabIndex="-1"
              aria-disabled="true"
              onClick={this.onNext}
            >
              Newer
            </a>
          </nav>
        )}
        {this.props.posts.totalDocs === 0 && (
          <h3 className="text-center">No Post</h3>
        )}
      </>
    );
  }
}
const mapStateToProps = state => ({
  posts: state.posts
});
const mapDispatchToProps = {
  getPosts: getPosts
};
const listPost = connect(mapStateToProps, mapDispatchToProps)(ListPost);
export default listPost;
