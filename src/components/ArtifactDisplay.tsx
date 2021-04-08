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
    ArtifactSets.find((x) => x.key === artifact.set) ?? InvalidListableItem;
  const type =
    ArtifactTypes.find((x) => x.key === artifact.type) ?? InvalidListableItem;
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
            <Typography variant="h5">{artifact.id}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h6">Level: {artifact.level}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Rating value={artifact.quality} readOnly />
          </Grid>
          {GetStatDisplay(MainStatNames, artifact.mainStat, 4)}
          {artifact.subStats.map((x) => GetStatDisplay(SubStatNames, x, 6))}
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
    statTypes.find((x) => x.key === stat.statName) ?? InvalidListableItem;
  return (
    <Grid item key={stat.statName} xs={size}>
      {type.value}: {stat.value}
    </Grid>
  );
}

export default ArtifactDisplay;
