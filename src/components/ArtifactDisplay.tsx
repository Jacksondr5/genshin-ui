import {
  Card,
  CardContent,
  Grid,
  GridSize,
  Typography,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import React from "react";
import {
  Artifact,
  ArtifactSets,
  ArtifactStat,
  ArtifactTypes,
  InvalidListableItem,
  ListableItem,
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
  const set =
    ArtifactSets.find((x) => x.key === artifact.Set) ?? InvalidListableItem;
  const type =
    ArtifactTypes.find((x) => x.key === artifact.Type) ?? InvalidListableItem;
  return (
    <Card>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="h5">{set.value}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h5">{type.value}</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="h5">{artifact.Id}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h6">Level: {artifact.Level}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Rating value={artifact.Quality} readOnly />
          </Grid>
          {GetStatDisplay(MainStatNames, artifact.MainStat, 4)}
          {artifact.SubStats.map((x) => GetStatDisplay(SubStatNames, x, 6))}
        </Grid>
      </CardContent>
    </Card>
  );
};

function GetStatDisplay(
  statTypes: ListableItem[],
  stat: ArtifactStat,
  size: GridSize
) {
  const type =
    statTypes.find((x) => x.key === stat.StatName) ?? InvalidListableItem;
  return (
    <Grid item key={stat.StatName} xs={size}>
      {type.value}: {stat.Value}
    </Grid>
  );
}

export default ArtifactDisplay;
