import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { addComment } from "../actions";
import { connect } from "react-redux";

const AddComment = ({ addComment, postId }) => {
  const formik = useFormik({
    initialValues: {
      content: ""
    },
    validationSchema: Yup.object({
      content: Yup.string().required("Content is required")
    }),
    onSubmit: (values, { resetForm }) => {
      resetForm();
      addComment({ ...values, post_id: postId });
    }
  });
  return (
    <div className="card my-4">
      <h5 className="card-header">Leave a Comment:</h5>
      <div className="card-body">
        <form onSubmit={formik.handleSubmit}>
          <div className="form-group">
            <textarea
              className="form-control"
              rows="3"
              name="content"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.content}
            ></textarea>
            {formik.touched.content && formik.errors.content ? (
              <div className="valid-feedback d-block text-danger">
                {formik.errors.content}
              </div>
            ) : null}
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
    // <form onSubmit={formik.handleSubmit}>
    //   <div className="form-group">
    //     <label >Your comment</label>
    //     <textarea
    //       className="form-control"
    //       rows="6"
    //       name="content"
    //       onChange={formik.handleChange}
    //       onBlur={formik.handleBlur}
    //       value={formik.values.content}
    //     ></textarea>
    //     {formik.touched.content && formik.errors.content ? (
    //       <div className="valid-feedback d-block text-danger">
    //         {formik.errors.content}
    //       </div>
    //     ) : null}
    //   </div>
    //   <button type="submit" className="btn btn-primary">
    //     Save
    //   </button>
    // </form>
  );
};
const mapDispatchToProps = {
  addComment: addComment
};
export default connect(null, mapDispatchToProps)(AddComment);
