import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import ListPost from "./components/ListPost";
import AddPost from "./components/AddPost";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import DetailPost from "./components/DetailPost";
import { PrivateRoute } from "./components/PrivateRoute";
function App() {
  return (
    <Router>
      <div className="container">
        <Nav></Nav>

        <main role="main" className="container">
          <div className="row">
            <div className="col-md-12 blog-main pt-5">
              <Route path="/" exact component={ListPost} />
              <PrivateRoute path="/add-post" component={AddPost}></PrivateRoute>
              <Route path="/posts/:id" component={DetailPost} />
            </div>
          </div>
        </main>
      </div>
      <Footer></Footer>
    </Router>
  );
}

export default App;
