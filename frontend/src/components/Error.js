import React from "react";
import { Typography } from "@material-ui/core";

const Error = ({ message, condition }) => {
  return (
    <>
      {condition && (
        <Typography
          style={{
            color: "red",
            fontWeight: "600",
            fontFamily: "monospace",
          }}
        >
          {message}
        </Typography>
      )}
    </>
  );
};

export default Error;
