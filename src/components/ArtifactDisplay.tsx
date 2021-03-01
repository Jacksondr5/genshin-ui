import { Card, CardContent, Grid } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import React from "react";
import {
  Artifact,
  ArtifactSets,
  ArtifactStat,
  ArtifactTypes,
  MainStatNames,
  SubStatNames,
} from "../data/Artifact";

interface ArtifactDisplayProps {
  artifact: Artifact;
}

const ArtifactDisplay: React.FunctionComponent<ArtifactDisplayProps> = (
  props
) => {
  const artifact = props.artifact;
  return (
    <Card>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            {ArtifactSets[artifact.Set]}
          </Grid>
          <Grid item xs={6}>
            {ArtifactTypes[artifact.Type]}
          </Grid>
          <Grid item xs={6}>
            Level: {artifact.Level}
          </Grid>
          <Grid item xs={6}>
            <Rating value={artifact.Quality} readOnly />
          </Grid>
          {GetStatDisplay(MainStatNames, artifact.MainStat)}
          {artifact.SubStats.map((x) => GetStatDisplay(SubStatNames, x))}
        </Grid>
      </CardContent>
    </Card>
  );
};

function GetStatDisplay(
  statTypes: { [name: number]: string },
  stat: ArtifactStat
) {
  return (
    <>
      <Grid item xs={6}>
        {statTypes[stat.StatName]}: {stat.Value}
      </Grid>
    </>
  );
}

export default ArtifactDisplay;
