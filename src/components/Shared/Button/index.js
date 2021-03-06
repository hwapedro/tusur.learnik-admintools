import React from "react";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";


const ButtonContainer = withStyles({
  root: {
    "& .MuiButton-label": {
      fontSize: "14px"
    }
  }
})(Button);

function ButtonElement({ onClick, children, type, buttonStyle, color, buttonColor, ...props }) {
  color = color ? "white" : "";
  return (
    <div>
      <ButtonContainer
        type={type}
        variant={`${buttonStyle}`}
        color={buttonColor ? buttonColor : 'primary'}
        onClick={onClick}
        style={{ margin: "0px 3px", color: `${color}` }}
        {...props}
      >
        {children}
      </ButtonContainer>
    </div>
  );
}

export default ButtonElement;
