import React from "react";

export const buttonStatuses = {
  DEFAULT: "default",
  LOADING: "loading",
  ERROR: "error"
};

const Button = ({ onClick, text, status }) => (
  <button
    onClick={onClick}
    className="Product-button"
    disabled={status === buttonStatuses.LOADING}
  >
    {text}
  </button>
);

export default Button;
