import React, { Component } from "react";
import { connect } from "react-redux";
import { getDetailPost } from "../actions";
import * as moment from "moment";
import AddComment from "./AddComment";
import Comments from "./Comments";
import Highlight from "react-highlight";
import marked from "marked";
import Tags from "./Tags";
marked.setOptions({
  gfm: true,
  tables: true,
  breaks: true
});
class DetailPost extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getDetailPost(id);
  }
  render() {
    return (
      <>
        {this.props.post && (
          <div className="blog-post" key={this.props.post._id}>
            <h2 className="blog-post-title">{this.props.post.title}</h2>
            <p className="blog-post-meta">
              {moment(this.props.post.createdAt).format("MMM Do YYYY")} by{" "}
              <span>{this.props.post.owner.name}</span>
            </p>
            <Tags tags={this.props.post.tags}></Tags>
            <br/>
            <Highlight innerHTML>{marked(this.props.post.content)}</Highlight>
          </div>
        )}
        <AddComment postId={this.props.match.params.id}></AddComment>
        <hr></hr>
        <Comments comments={this.props.post.comments}></Comments>
        <br />
        <br />
      </>
    );
  }
}
const mapStateToProps = state => ({
  post: state.post
});
const mapDispatchToProps = {
  getDetailPost: getDetailPost
};
export default connect(mapStateToProps, mapDispatchToProps)(DetailPost);
