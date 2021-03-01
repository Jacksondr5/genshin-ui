import {
  MenuItem,
  Button,
  Select,
  TextField,
  FormControl,
  InputLabel,
  Grid,
} from "@material-ui/core";
import React from "react";
import react, { useState } from "react";
import {
  Artifact,
  ArtifactSets,
  ArtifactStat,
  ArtifactStatType,
  ArtifactTypes,
  MainStatNames,
  SubStatNames,
} from "../data/Artifact";

interface NewArtifactProps {
  onSubmit: (newArtifact: Artifact) => void;
}

const NewArtifact: React.FunctionComponent<NewArtifactProps> = (
  props: NewArtifactProps
) => {
  const [artifactType, setArtifactType] = useState("0");
  const [artifactSet, setArtifactSet] = useState("0");
  const [level, setLevel] = useState("0");
  const [quality, setQuality] = useState("0");
  const [mainStat, setMainStat] = useState<ArtifactStat>(
    GetArtifactStat(ArtifactStatType.MainStat)
  );
  const [subStat1, setSubStat1] = useState<ArtifactStat>(
    GetArtifactStat(ArtifactStatType.SubStat)
  );
  const [subStat2, setSubStat2] = useState<ArtifactStat>(
    GetArtifactStat(ArtifactStatType.SubStat)
  );
  const [subStat3, setSubStat3] = useState<ArtifactStat>(
    GetArtifactStat(ArtifactStatType.SubStat)
  );
  const [subStat4, setSubStat4] = useState<ArtifactStat>(
    GetArtifactStat(ArtifactStatType.SubStat)
  );
  return (
    <Grid container spacing={2}>
      {GetSelect("Artifact Type", ArtifactTypes, artifactType, setArtifactType)}
      {GetSelect("Artifact Set", ArtifactSets, artifactSet, setArtifactSet)}
      <Grid item xs={3}>
        <TextField
          label="Level"
          value={level}
          onChange={(x) => setLevel(x.target.value)}
        ></TextField>
      </Grid>
      <Grid item xs={3}>
        <TextField
          label="Quality"
          value={quality}
          onChange={(x) => setQuality(x.target.value)}
        ></TextField>
      </Grid>

      {GetStatInput("Main Stat", MainStatNames, mainStat, setMainStat)}
      {GetStatInput("Sub Stat", SubStatNames, subStat1, setSubStat1)}
      {GetStatInput("Sub Stat", SubStatNames, subStat2, setSubStat2)}
      {GetStatInput("Sub Stat", SubStatNames, subStat3, setSubStat3)}
      {GetStatInput("Sub Stat", SubStatNames, subStat4, setSubStat4)}
      <Button>Submit</Button>
    </Grid>
  );
};

function GetArtifactStat(type: ArtifactStatType): ArtifactStat {
  return {
    StatName: 0,
    StatType: type,
    Value: 0,
  };
}

function GetSelect<T>(
  label: string,
  mappableObject: object,
  value: T,
  onChange: (value: React.SetStateAction<T>) => void
) {
  return (
    <Grid item xs={3}>
      <FormControl>
        <InputLabel>{label}</InputLabel>
        <Select value={value} onChange={(x) => onChange(x.target.value as T)}>
          {Object.entries(mappableObject).map((x) => (
            <MenuItem value={x[0]}>{x[1]}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
  );
}

function GetStatInput(
  label: string,
  mappableObject: object,
  stat: ArtifactStat,
  setStat: react.Dispatch<react.SetStateAction<ArtifactStat>>
) {
  return (
    <>
      <Grid item xs={3}>
        <FormControl>
          <InputLabel>{label}</InputLabel>
          <Select
            value={stat.StatName}
            onChange={(x) =>
              setStat({
                ...stat,
                StatName: x.target.value as number,
              })
            }
          >
            {Object.entries(mappableObject).map((x) => (
              <MenuItem value={x[0]}>{x[1]}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={3}>
        <TextField
          label="Value"
          value={stat.Value}
          onChange={(x) =>
            setStat({
              ...stat,
              Value: Number.parseInt(x.target.value),
            })
          }
        ></TextField>
      </Grid>
    </>
  );
}

export default NewArtifact;
