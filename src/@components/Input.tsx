import React from "react";
import TextField from "@mui/material/TextField";
import { Controller } from "react-hook-form";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  MenuItem,
} from "@mui/material";

interface Props {
  required?: boolean;
  onClick?: any;
  type?: string;
  className?: string;
  style?: object;
  name: string;
  label?: any;
  errorMessage?: string;
  control: any;
  error?: boolean;
  fullWidth?: boolean;
  multiline?: boolean;
  rows?: number;
  color?:
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning"
    | "default"
    | undefined;
  size?: "small" | "medium" | undefined;
  list?: any;
  variant?: "outlined" | "standard" | "filled" | undefined;
  placeholder?: string;
  labelOutside?: boolean;
}

const Input: React.FC<Props> = (props) => {
  const {
    name,
    label,
    control,
    type,
    error,
    errorMessage,
    required,
    fullWidth,
    className,
    multiline,
    rows,
    variant,
    list,
    size,
    color,
    placeholder,
    labelOutside,
  } = props;
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) =>
        type === "select" ? (
          <div className="flex flex-col w-full">
            <TextField
              {...field}
              className={`capitalize ${className}`}
              variant={variant ? variant : "outlined"}
              select
              label={!labelOutside && label}
              error={error}
              helperText={errorMessage}
              required={required}
              fullWidth={fullWidth}
              size={size}
            >
              {list.map((listItem: any) => {
                return (
                  <MenuItem key={listItem.value} value={listItem.value}>
                    {listItem.label}
                  </MenuItem>
                );
              })}
            </TextField>
          </div>
        ) : type === "checkbox" ? (
          <Controller
            name={name}
            control={control}
            render={({ field }) => (
              <FormControl
                className={`${className}`}
                error={error}
                required={required}
              >
                <FormControlLabel
                  label={label}
                  control={
                    <Checkbox color={color} {...field} checked={field.value} />
                  }
                />
                <FormHelperText>{errorMessage}</FormHelperText>
              </FormControl>
            )}
          />
        ) : (
          <div className="flex flex-col w-full">
            <TextField
              {...field}
              className={`capitalize ${className}`}
              variant={variant ? variant : "outlined"}
              label={!labelOutside && label}
              type={type}
              error={error}
              helperText={errorMessage}
              required={required}
              fullWidth={fullWidth}
              multiline={multiline}
              rows={rows}
              size={size}
              placeholder={placeholder}
            />
          </div>
        )
      }
    />
  );
};

export default Input;
