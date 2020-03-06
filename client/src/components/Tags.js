import React from "react";
import { Badge } from "reactstrap";
const Tags = ({ tags }) => {
  return (
    <>
      {tags.length > 0 &&
        tags.map(tag => {
          return (<Badge className="mr-2" href={`/?tag=${tag}`} color="success" pill key={tag}>
            {tag}
          </Badge>);
        })}
    </>
  );
};
export default Tags;
