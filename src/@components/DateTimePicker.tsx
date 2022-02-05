import { TextField } from "@mui/material";
import React from "react";
import { LocalizationProvider } from "@mui/lab";
import DateAdapter from "@mui/lab/AdapterDateFns";
import {
  DateRangePicker as MaterialDateRangePicker,
  DatePicker as MaterialDatePicker,
  DateTimePicker as MaterialDateTimePicker,
} from "@mui/lab";
import { Controller } from "react-hook-form";

interface DateTimePickerProps {
  name: string;
  label?: string;
  control: any;
  error?: boolean;
  errorMessage?: string;
  required?: boolean;
  fullWidth?: boolean;
  className?: string;
  color?:
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning"
    | undefined;
  size?: "small" | "medium" | undefined;
  variant?: "outlined" | "standard" | "filled" | undefined;
  startText?: string;
  endText?: string;
  okText?: string;
  cancelText?: string;
  inputFormat?: string;
  minDate?: Date;
  maxDate?: Date;
  type?: any;
  minDateTime?: Date;
}

const DateTimePicker: React.FC<DateTimePickerProps> = (props) => {
  const {
    name,
    control,
    error,
    errorMessage,
    required,
    fullWidth,
    className,
    color,
    variant,
    size = "medium",
    startText,
    endText,
    okText = "ok",
    cancelText = "cancel",
    inputFormat = "dd/MM/yyyy",
    minDate,
    maxDate,
    type,
    label,
    minDateTime,
  } = props;

  return (
    <div className={`flex w-full justify-center ${className}`}>
      <LocalizationProvider dateAdapter={DateAdapter}>
        <Controller
          name={name}
          control={control}
          render={({ field }: { field: any }) =>
            type === "dateRange" ? (
              <MaterialDateRangePicker
                {...field}
                startText={startText}
                endText={endText}
                okText={okText}
                cancelText={cancelText}
                inputFormat={inputFormat}
                minDate={minDate}
                maxDate={maxDate}
                className="w-min"
                renderInput={(startProps, endProps) => (
                  <div className="flex">
                    <TextField
                      {...startProps}
                      className={`capitalize`}
                      error={error}
                      helperText={errorMessage}
                      required={required}
                      variant={variant}
                      size={size}
                      fullWidth={fullWidth}
                      color={color}
                    />
                    <TextField
                      {...endProps}
                      className={`capitalize  ml-2`}
                      error={error}
                      helperText={errorMessage}
                      required={required}
                      variant={variant}
                      size={size}
                      fullWidth={fullWidth}
                      color={color}
                    />
                  </div>
                )}
              />
            ) : type === "dateTime" ? (
              <MaterialDateTimePicker
                {...field}
                label={label}
                okText={okText}
                cancelText={cancelText}
                minDateTime={minDateTime}
                renderInput={(props) => (
                  <TextField
                    {...props}
                    className={`capitalize`}
                    error={error}
                    helperText={errorMessage}
                    required={required}
                    variant={variant}
                    size={size}
                    fullWidth={fullWidth}
                    color={color}
                  />
                )}
              />
            ) : (
              <MaterialDatePicker
                {...field}
                okText={okText}
                cancelText={cancelText}
                inputFormat={inputFormat}
                minDate={minDate}
                maxDate={maxDate}
                renderInput={(params) => (
                  <div className="flex flex-col w-full">
                    <TextField
                      {...params}
                      className={`capitalize`}
                      error={error}
                      helperText={errorMessage}
                      required={required}
                      variant={variant}
                      size={size}
                      fullWidth={fullWidth}
                      color={color}
                      label={label}
                    />
                  </div>
                )}
              />
            )
          }
        />
      </LocalizationProvider>
    </div>
  );
};

export default DateTimePicker;
