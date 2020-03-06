import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { signUp } from "../actions";
import { connect } from "react-redux";
import { ModalBody, Alert } from "reactstrap";

const SignUp = ({ signUp, error }) => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: ""
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string()
        .required("Email is required")
        .email("Invalid email address"),
      password: Yup.string().required("Password is required")
    }),
    onSubmit: (values, { resetForm }) => {
      signUp(values);
    }
  });
  return (
    <>
      <ModalBody>
        <form onSubmit={formik.handleSubmit}>
        {error && <Alert color="danger">{error}</Alert>}
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              placeholder=""
              name="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="valid-feedback d-block text-danger">
                {formik.errors.name}
              </div>
            ) : null}
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="text"
              className="form-control"
              placeholder=""
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="valid-feedback d-block text-danger">
                {formik.errors.email}
              </div>
            ) : null}
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder=""
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="valid-feedback d-block text-danger">
                {formik.errors.password}
              </div>
            ) : null}
          </div>
          <button type="submit" className="btn btn-primary btn-lg btn-block">
            Sign Up
          </button>
        </form>
      </ModalBody>
    </>
  );
};
const mapDispatchToProps = {
  signUp: signUp
};
const mapStateToProps = state => ({
  error: state.error
});
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
