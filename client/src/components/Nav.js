import React, { useState, useEffect } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { Link } from "react-router-dom";
import { Modal, ModalHeader } from "reactstrap";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Search from "./Search";
import { connect } from "react-redux";
import {
  toggleSignInModal,
  toggleSignUpModal,
  getProfile,
  logout
} from "../actions";
import AuthService from "../services/AuthService";
import Account from "./Account";
const Nav = ({
  signInModal,
  toggleSignInModal,
  signUpModal,
  toggleSignUpModal,
}) => {
  return (
    <>
      <header className="blog-header py-3">
        <div className="row flex-nowrap justify-content-between align-items-center">
          <div className="col-4 text-left">
            <a className="blog-header-logo text-dark" href="/">
              ZIGVY
            </a>
          </div>
          <div className="col-8 d-flex justify-content-end align-items-center">
            <Search></Search>
            {AuthService.isLogin() ? (
              <Account></Account>
            ) : (
              <>
                <a
                  className="btn btn-sm btn-outline-secondary"
                  href="#"
                  onClick={toggleSignInModal}
                >
                  Sign in
                </a>
                <a
                  className="btn btn-sm btn-primary ml-3"
                  href="#"
                  onClick={toggleSignUpModal}
                >
                  Sign up
                </a>
              </>
            )}
          </div>
        </div>
      </header>
      <Modal isOpen={signInModal} toggle={toggleSignInModal}>
        <ModalHeader toggle={toggleSignInModal}>Sign in</ModalHeader>
        <SignIn></SignIn>
      </Modal>
      <Modal isOpen={signUpModal} toggle={toggleSignUpModal}>
        <ModalHeader toggle={toggleSignUpModal}>Sign up</ModalHeader>
        <SignUp></SignUp>
      </Modal>
    </>
  );
};
const mapStateToProps = state => ({
  signInModal: state.signInModal,
  signUpModal: state.signUpModal,
  user: state.user
});
const mapDispatchToProps = {
  toggleSignInModal: toggleSignInModal,
  toggleSignUpModal: toggleSignUpModal,
  getProfile: getProfile,
  logout: logout
};
export default connect(mapStateToProps, mapDispatchToProps)(Nav);
