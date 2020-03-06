import React from "react";
import { addPost } from "../actions";
import { connect } from "react-redux";
import SimpleMDE from "react-simplemde-editor";
import CreatableSelect from "react-select/creatable";
import "easymde/dist/easymde.min.css";

class AddPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {
        _id: null,
        title: "",
        content: "",
        tags: []
      },
      ready: false
    };
  }
  componentDidMount() {
    this.setState({
      ready: true
    });
  }
  onSave = e => {
    e.preventDefault();
    this.props.addPost(this.state.post);
  };

  handleChangeTag = newValue => {
    const tags = newValue.map(tag => {
      return tag.value;
    });
    this.setState({
      post: {
        ...this.state.post,
        tags: tags
      }
    });
  };

  handleChangeMarkdown = value => {
    this.setState({
      post: {
        ...this.state.post,
        content: value
      }
    });
  };
  handleChange = event => {
    const { value, name } = event.target;
    this.setState({
      post: {
        ...this.state.post,
        [name]: value
      }
    });
  };
  render() {
    const { post } = this.state;
    let tags = post.tags.map(tag => {
      return { value: tag, label: tag };
    });
    return (
      <form onSubmit={this.onSave}>
        <h3 className="mt-4">Add Post</h3>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            className="form-control"
            placeholder=""
            name="title"
            value={post.title}
            onChange={this.handleChange}
          />
          {this.props.error && (
            <div className="valid-feedback d-block text-danger">
              {this.props.error}
            </div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="inputAddress2">Tags</label>
          <CreatableSelect
            isMulti
            onChange={this.handleChangeTag}
            options={tags}
            value={tags}
          />
        </div>
        <div className="form-group">
          <label htmlFor="title">Content</label>
          <SimpleMDE
            onChange={this.handleChangeMarkdown}
            value={post.content}
          />
        </div>
        <button type="submit" className="btn btn-primary btn-lg btn-block">
          Save
        </button>
      </form>
    );
  }
}
const mapStateToProps = state => ({
  error: state.error
});
const mapDispatchToProps = {
  addPost: addPost
};
export default connect(mapStateToProps, mapDispatchToProps)(AddPost);
