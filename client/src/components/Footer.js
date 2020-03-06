import React, { Component } from "react";

export default class Footer extends Component {
  render() {
    return (
      <>
        <footer className="blog-footer">
          <p>
            Blog template built for{" "}
            <a href="https://getbootstrap.com/">Bootstrap</a> by{" "}
            <a href="https://twitter.com/mdo">@mdo</a>.
          </p>
          <p>
            <a href="https://twitter.com/mdo">Back to top</a>
          </p>
        </footer>
      </>
    );
  }
}
