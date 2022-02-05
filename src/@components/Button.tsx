import React from "react";
import Button from "@mui/material/Button";

interface Props {
  variant?: "text" | "contained" | "outlined" | undefined;
  color?:
    | "inherit"
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning"
    | undefined;
  size?: "small" | "medium" | "large" | undefined;
  disabled?: boolean;
  onClick?: any;
  onMouseOver?: any;
  onMouseOut?: any;
  type?: "button" | "submit" | "reset" | undefined;
  className?: string;
  style?: object;
}

export const CustomButton: React.FC<Props> = (props) => {
  const {
    variant = "contained",
    color = "primary",
    disabled,
    onClick,
    onMouseOver,
    onMouseOut,
    type,
    className,
    size = "medium",
    style,
    children,
  } = props;
  return (
    <Button
      variant={variant}
      color={color}
      size={size}
      disableElevation
      disabled={disabled}
      className={`outline-none rounded-full ${className} `}
      onClick={onClick}
      style={style}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      type={type && type}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
