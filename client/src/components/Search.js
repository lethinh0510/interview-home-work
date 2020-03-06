import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import queryString from "query-string";
import { getPosts } from "../actions";
import { connect } from "react-redux";
const Search = props => {
  const params = queryString.parse(props.history.location.search);
  let defaultValue = "";
  if (params.q) {
    defaultValue = params.q;
  }
  const [value, setValue] = useState(defaultValue);
  const onSearch = e => {
    e.preventDefault();
    props.getPosts(1, null, value);
    props.history.push("?q=" + value);
  };
  return (
    <form className="form-inline my-2 my-lg-0 mr-3" onSubmit={onSearch}>
      <input
        className="form-control mr-sm-2"
        type="text"
        placeholder="Search"
        aria-label="Search"
        name="search"
        value={value}
        onChange={e => setValue(e.target.value)}
      />
      <button className="btn btn-secondary my-2 my-sm-0" type="submit">
        Search
      </button>
    </form>
  );
};

const mapDispatchToProps = {
  getPosts: getPosts
};
export default withRouter(connect(null, mapDispatchToProps)(Search));
// export default withRouter(Search);
