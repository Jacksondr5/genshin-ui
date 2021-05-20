import { Grid, GridSize, TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import React, { useState } from "react";
import {
  Artifact,
  ArtifactSets,
  ArtifactTypes,
  ListableItem,
  MainStatNames,
  SubStatNames,
} from "../data/Artifact";
import ArtifactDisplay from "./ArtifactDisplay";
import { GridTextInputNumber } from "./GridTextInput";
import { GetSelect } from "./NewArtifact";

export interface ArtifactListProps {
  artifacts: Artifact[];
  typeFilter?: number;
  onSelect?: (artifactId: number) => void;
}
const allListableItem: ListableItem = {
  key: -1,
  value: "All",
};

const ArtifactList: React.FunctionComponent<ArtifactListProps> = (props) => {
  const [type, setType] = useState(props.typeFilter ?? allListableItem.key);
  const [set, setSet] = useState(allListableItem.key);
  const [quality, setQuality] = useState(allListableItem.key);
  const [mainStat, setMainStat] = useState(allListableItem);
  const [subStat, setSubStat] = useState(allListableItem);
  const artifactsUi = props.artifacts
    .filter(
      (x) =>
        (type === allListableItem.key || x.type === type) &&
        (set === allListableItem.key || x.set === set) &&
        (quality === allListableItem.key || x.quality === quality) &&
        (mainStat.key === allListableItem.key ||
          mainStat.key === x.mainStat.statName) &&
        (subStat.key === allListableItem.key ||
          x.subStats.find((y) => subStat.key === y.statName))
    )
    .sort((x, y) => x.type - y.type)
    .map((x) => (
      <Grid key={x.id} item xs={4}>
        <ArtifactDisplay artifact={x} />
      </Grid>
    ));
  return (
    <>
      <Grid container spacing={2}>
        {GetSelect(
          1,
          "Artifact Type",
          [allListableItem, ...ArtifactTypes],
          type,
          setType
        )}
        {GetSelect(
          2,
          "Artifact Set",
          [allListableItem, ...ArtifactSets],
          set,
          setSet
        )}
        <GridTextInputNumber
          size={1}
          label="Quality"
          value={quality}
          onChange={setQuality}
        />
        {GetAutoComplete(
          2,
          "Main Stat",
          [allListableItem, ...MainStatNames],
          mainStat,
          setMainStat
        )}
        {GetAutoComplete(
          2,
          "Sub Stat",
          [allListableItem, ...SubStatNames],
          subStat,
          setSubStat
        )}
      </Grid>
      <Grid container spacing={2}>
        {artifactsUi}
      </Grid>
    </>
  );
};

export function GetAutoComplete(
  size: GridSize,
  label: string,
  options: ListableItem[],
  value: ListableItem,
  onChange: (value: React.SetStateAction<ListableItem>) => void
) {
  return (
    <Grid item xs={size}>
      <Autocomplete
        options={options}
        getOptionLabel={(x) => x.value}
        value={value}
        renderInput={(params) => (
          <TextField {...params} label={label} variant="outlined" />
        )}
        onChange={(x, newValue) => onChange(newValue ?? allListableItem)}
      />
    </Grid>
  );
}

export default ArtifactList;
