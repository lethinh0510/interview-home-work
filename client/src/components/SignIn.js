import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { signIn } from "../actions";
import { connect } from "react-redux";
import { ModalBody, Alert } from "reactstrap";

const SignIn = ({ signIn, error }) => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Email is required"),
      password: Yup.string().required("Password is required")
    }),
    onSubmit: values => {
      signIn(values);
    }
  });
  return (
    <>
      <ModalBody>
        <form onSubmit={formik.handleSubmit}>
          {error && <Alert color="danger">{error}</Alert>}

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
            Sign In
          </button>
        </form>
      </ModalBody>
    </>
  );
};
const mapDispatchToProps = {
  signIn: signIn
};
const mapStateToProps = state => ({
  error: state.error
});
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
