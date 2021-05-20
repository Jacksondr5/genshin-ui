import { Card, CardContent, CardHeader, Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Artifact } from "../data/Artifact";
import { Character } from "../data/Character";
import { GridTextInputString } from "./GridTextInput";
import LoadoutDisplay from "./LoadoutDisplay";

export interface CharacterListProps {
  artifacts: Artifact[];
}

const CharacterList = (props: CharacterListProps) => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [fetchTrigger, setFetchTrigger] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch("http://genshin-api.dev.k8s.j5/character");
      setCharacters(await result.json());
    };

    fetchData();
  }, [fetchTrigger]);
  const [name, setName] = useState("");

  const filteredCharacters = characters.filter((x) => x.name.startsWith(name));
  return (
    <Grid container spacing={2}>
      <GridTextInputString
        size={12}
        label="Character Filter"
        value={name}
        onChange={setName}
      ></GridTextInputString>
      {filteredCharacters.map((x) => (
        <Grid key={x.id} item xs={12}>
          <Card>
            <CardHeader title={x.name} subheader={x.id}></CardHeader>
            <CardContent>
              {x.loadouts.map((y) => (
                <LoadoutDisplay
                  key={y.id}
                  artifacts={props.artifacts}
                  loadout={y}
                />
              ))}
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default CharacterList;
