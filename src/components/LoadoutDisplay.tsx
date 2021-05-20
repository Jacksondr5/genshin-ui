import { Card, CardContent, Grid, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { Artifact } from "../data/Artifact";
import { Loadout } from "../data/Character";
import ArtifactDisplay from "./ArtifactDisplay";

export interface LoadoutDisplayProps {
  loadout: Loadout;
  artifacts: Artifact[];
}

const LoadoutDisplay = (props: LoadoutDisplayProps) => {
  const artifactDisplays = [
    props.loadout.flowerId,
    props.loadout.featherId,
    props.loadout.cupId,
    props.loadout.clockId,
    props.loadout.circletId,
  ]
    .map((x) => props.artifacts.find((y) => y.id === x))
    .filter((x) => x != undefined)
    .map((x) => (
      <Grid key={x!.id} item xs={2}>
        <ArtifactDisplay artifact={x!} />
      </Grid>
    ));
  return (
    <Card>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5">{props.loadout.id}</Typography>
            <Typography variant="h5">{props.loadout.name}</Typography>
          </Grid>
          {artifactDisplays}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default LoadoutDisplay;
