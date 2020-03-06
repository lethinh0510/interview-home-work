import React, { useState } from "react";
import * as moment from "moment";
import { Collapse } from "reactstrap";
const Comments = ({ comments }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  return (
    <>
      {comments.length > 0 && (
        <div  className="mb-4" onClick={toggle}>
          {comments.length} replies
        </div>
      )}
      <Collapse isOpen={isOpen}>
        {comments.map(comment => {
          return (
            <div className="media mt-3 mb-4" key={comment._id}>
              <img
                className="d-flex mr-3 rounded-circle"
                src="http://placehold.it/50x50"
                alt=""
              />
              <div className="media-body">
                <h5 className="mt-0">
                  {comment.owner.name}{" "}
                  <small>
                    {" "}
                    at {moment(comment.createdAt).fromNow()}
                  </small>
                </h5>
                {comment.content}
              </div>
            </div>
          );
        })}
      </Collapse>
    </>
  );
};
export default Comments;
