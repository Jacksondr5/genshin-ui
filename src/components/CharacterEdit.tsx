import { Button, Grid } from "@material-ui/core";
import React, { useState } from "react";
import { Artifact } from "../data/Artifact";
import { Character } from "../data/Character";
import { GridTextInputString } from "./GridTextInput";
import LoadoutEdit from "./LoadoutEdit";

export interface CharacterEditProps {
  artifacts: Artifact[];
  character?: Character;
  onSubmit: (character: Character) => void;
}

const CharacterEdit = (props: CharacterEditProps) => {
  const [name, setName] = useState(props.character?.name ?? "");

  return (
    <Grid container spacing={2}>
      <GridTextInputString
        size={10}
        label="Name"
        value={name}
        onChange={setName}
      />
      <Grid item xs={2}>
        <Button
          variant="contained"
          onClick={() =>
            props.onSubmit({
              id: props.character?.id ?? -1,
              name: name,
              loadouts: props.character?.loadouts ?? [],
            })
          }
        >
          Submit
        </Button>
      </Grid>
      <Grid item xs={12}>
        {/* <LoadoutDisplay /> */}
      </Grid>
    </Grid>
  );
};

export default CharacterEdit;
