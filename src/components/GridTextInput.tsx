import React from "react";
import { Grid, GridSize, TextField } from "@material-ui/core";

interface GetTextInput<T> {
  size: GridSize;
  label: string;
  value: T;
  onChange: (value: React.SetStateAction<T>) => void;
}

export const GridTextInputNumber = (props: GetTextInput<number>) => {
  return (
    <Grid item xs={props.size}>
      <TextField
        label={props.label}
        value={props.value}
        onChange={(x) => {
          const value = Number.parseInt(x.target.value);
          if (Number.isNaN(value)) props.onChange(0);
          props.onChange(value);
        }}
      ></TextField>
    </Grid>
  );
};

export const GridTextInputString = (props: GetTextInput<string>) => {
  return (
    <Grid item xs={props.size}>
      <TextField
        label={props.label}
        value={props.value}
        onChange={(x) => props.onChange(x.target.value)}
      ></TextField>
    </Grid>
  );
};
