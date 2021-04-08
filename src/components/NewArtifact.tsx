import { Button, TextField, Grid, GridSize } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import React from "react";
import react, { useState } from "react";
import {
  Artifact,
  ArtifactSets,
  ArtifactStat,
  ArtifactStatType,
  ArtifactTypes,
  InvalidListableItem,
  ListableItem,
  MainStatNames,
  SubStatNames,
} from "../data/Artifact";

interface NewArtifactProps {
  onSubmit: (newArtifact: Artifact) => void;
}
interface UiArtifactStat {
  StatType: ArtifactStatType;
  StatName: number;
  Value: string;
}

const NewArtifact: React.FunctionComponent<NewArtifactProps> = (
  props: NewArtifactProps
) => {
  const [artifactType, setArtifactType] = useState(0);
  const [artifactSet, setArtifactSet] = useState(0);
  const [level, setLevel] = useState(0);
  const [quality, setQuality] = useState(0);
  const [mainStat, setMainStat] = useState<UiArtifactStat>(
    GetArtifactStat(ArtifactStatType.MainStat)
  );
  const [subStat1, setSubStat1] = useState<UiArtifactStat>(
    GetArtifactStat(ArtifactStatType.SubStat)
  );
  const [subStat2, setSubStat2] = useState<UiArtifactStat>(
    GetArtifactStat(ArtifactStatType.SubStat)
  );
  const [subStat3, setSubStat3] = useState<UiArtifactStat>(
    GetArtifactStat(ArtifactStatType.SubStat)
  );
  const [subStat4, setSubStat4] = useState<UiArtifactStat>(
    GetArtifactStat(ArtifactStatType.SubStat)
  );
  const newArtifact: Artifact = {
    id: 1,
    level: level,
    mainStat: ConvertUiArtifactStatToArtifactStat(mainStat),
    subStats: [
      ConvertUiArtifactStatToArtifactStat(subStat1),
      ConvertUiArtifactStatToArtifactStat(subStat2),
      ConvertUiArtifactStatToArtifactStat(subStat3),
      ConvertUiArtifactStatToArtifactStat(subStat4),
    ],
    quality: quality,
    set: artifactSet,
    type: artifactType,
  };
  return (
    <Grid container spacing={2}>
      {GetSelect(
        3,
        "Artifact Type",
        ArtifactTypes,
        artifactType,
        setArtifactType
      )}
      {GetSelect(3, "Artifact Set", ArtifactSets, artifactSet, setArtifactSet)}
      {GetTextInput(3, "Level", level, setLevel)}
      {GetTextInput(3, "Quality", quality, setQuality)}

      {GetStatInput("Main Stat", MainStatNames, mainStat, setMainStat)}
      {GetStatInput("Sub Stat", SubStatNames, subStat1, setSubStat1)}
      {GetStatInput("Sub Stat", SubStatNames, subStat2, setSubStat2)}
      {GetStatInput("Sub Stat", SubStatNames, subStat3, setSubStat3)}
      {GetStatInput("Sub Stat", SubStatNames, subStat4, setSubStat4)}
      <Button
        variant="outlined"
        onClick={() => HandleSubmit(props.onSubmit, newArtifact)}
      >
        Submit
      </Button>
    </Grid>
  );
};

function HandleSubmit(
  onSubmit: (newArtifact: Artifact) => void,
  artifact: Artifact
) {
  var workingArtifact = artifact;
  workingArtifact.subStats = workingArtifact.subStats.filter(
    (x) => x.statName !== SubStatNames[10].key
  );
  onSubmit(workingArtifact);
}

function ConvertUiArtifactStatToArtifactStat(ui: UiArtifactStat): ArtifactStat {
  return {
    statName: ui.StatName,
    statType: ui.StatType,
    value: Number.parseFloat(ui.Value),
  };
}

function GetArtifactStat(type: ArtifactStatType): UiArtifactStat {
  return {
    StatName: 0,
    StatType: type,
    Value: "0",
  };
}

export function GetSelect(
  size: GridSize,
  label: string,
  listableItems: ListableItem[],
  value: number,
  onChange: (value: React.SetStateAction<number>) => void
) {
  const thing =
    listableItems.find((x) => x.key === value) ?? InvalidListableItem;
  return (
    <Grid item xs={size}>
      <Autocomplete
        options={listableItems}
        getOptionLabel={(x) => x.value}
        value={thing}
        renderInput={(params) => (
          <TextField {...params} label={label} variant="outlined" />
        )}
        onChange={(x, newValue) =>
          onChange(newValue == null ? 0 : newValue.key)
        }
      />
    </Grid>
  );
}

export function GetTextInput(
  size: GridSize,
  label: string,
  value: number,
  onChange: (value: React.SetStateAction<number>) => void
) {
  return (
    <Grid item xs={size}>
      <TextField
        label={label}
        value={value}
        onChange={(x) => {
          const value = Number.parseInt(x.target.value);
          if (Number.isNaN(value)) onChange(0);
          onChange(value);
        }}
      ></TextField>
    </Grid>
  );
}

function GetStatInput(
  label: string,
  listableItems: ListableItem[],
  stat: UiArtifactStat,
  setStat: react.Dispatch<react.SetStateAction<UiArtifactStat>>
) {
  return (
    <>
      <Grid item xs={3}>
        <Autocomplete
          options={listableItems}
          getOptionLabel={(x) => x.value}
          value={listableItems.filter((x) => x.key === stat.StatName)[0]}
          renderInput={(params) => (
            <TextField {...params} label={label} variant="outlined" />
          )}
          onChange={(x, newValue) =>
            setStat({
              ...stat,
              StatName: newValue == null ? 0 : newValue.key,
            })
          }
        />
      </Grid>
      <Grid item xs={3}>
        <TextField
          label="Value"
          value={stat.Value}
          onChange={(x) =>
            setStat({
              ...stat,
              Value: x.target.value,
            })
          }
        ></TextField>
      </Grid>
    </>
  );
}

export default NewArtifact;
