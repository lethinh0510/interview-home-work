import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import {
  getProfile,
  logout
} from "../actions";
import { connect } from "react-redux";
const Account = ({user, logout, getProfile}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen(prevState => !prevState);

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle caret tag="div" className="cursor-pointer">
        {user.name}
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem>
          <Link to="/profile">Profile</Link>
        </DropdownItem>
        <DropdownItem>
          <Link to="/add-post">Add post</Link>
        </DropdownItem>
        <DropdownItem onClick={logout}>Logout</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
const mapStateToProps = state => ({
  user: state.user
});
const mapDispatchToProps = {
  getProfile: getProfile,
  logout: logout
};
export default connect(mapStateToProps, mapDispatchToProps)(Account);
