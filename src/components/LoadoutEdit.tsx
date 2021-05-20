import { Button, Grid, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { Artifact, ArtifactType } from "../data/Artifact";
import { Character, Loadout } from "../data/Character";
import ArtifactDisplay from "./ArtifactDisplay";
import ArtifactList from "./ArtifactList";
import { GridTextInputString } from "./GridTextInput";

export interface LoadoutEditProps {
  artifacts: Artifact[];
  loadout: Loadout;
  onSubmit: (loadout: Loadout) => void;
}

const LoadoutEdit = (props: LoadoutEditProps) => {
  const [circletId, setCircletId] = useState(props.loadout.circletId);
  const [clockId, setClockId] = useState(props.loadout.clockId);
  const [cupId, setCupId] = useState(props.loadout.cupId);
  const [featherId, setFeatherId] = useState(props.loadout.featherId);
  const [flowerId, setFlowerId] = useState(props.loadout.flowerId);
  const [name, setName] = useState(props.loadout.name);

  const [currentArtifactListFilter, setCurrentArtifactFilter] = useState(
    ArtifactType.Nothing
  );

  const editedLoadout: Loadout = {
    circletId: circletId,
    clockId: clockId,
    cupId: cupId,
    featherId: featherId,
    flowerId: flowerId,
    id: props.loadout.id,
    name: name,
  };

  return (
    <>
      <Grid container spacing={2}>
        <GridTextInputString
          size={4}
          label="Name"
          value={name}
          onChange={setName}
        />
        <ArtifactSelection
          label="Flower"
          artifactType={ArtifactType.Flower}
          artifact={props.artifacts.find((x) => x.id === flowerId)}
          onClick={setCurrentArtifactFilter}
        ></ArtifactSelection>
      </Grid>
      <ArtifactList
        artifacts={props.artifacts}
        typeFilter={
          currentArtifactListFilter == ArtifactType.Nothing
            ? undefined
            : (currentArtifactListFilter as number)
        }
      />
    </>
  );
};

interface ArtifactSelectionProps {
  label: string;
  artifact?: Artifact;
  artifactType: ArtifactType;
  onClick: (type: ArtifactType) => void;
}

function ArtifactSelection(props: ArtifactSelectionProps) {
  const artifactDisplay =
    props.artifact == null ? (
      <></>
    ) : (
      <ArtifactDisplay artifact={props.artifact}></ArtifactDisplay>
    );
  return (
    <Grid item xs={4}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography variant="h3">{props.label}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Button onClick={() => props.onClick(props.artifactType)}>
            Select
          </Button>
        </Grid>
        <Grid item xs={12}>
          {artifactDisplay}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default LoadoutEdit;
