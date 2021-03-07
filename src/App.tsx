import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import NewArtifact from "./components/NewArtifact";
import { Artifact } from "./data/Artifact";
import ArtifactDisplay from "./components/ArtifactDisplay";
import { Grid } from "@material-ui/core";

interface Data {
  artifacts: Artifact[];
}

function App() {
  const [data, setData] = useState<Data>({
    artifacts: [],
  });
  const [fetchTrigger, setFetchTrigger] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch("http://dumb-storage.dev.k8s.j5/genshin");
      setData(await result.json());
    };

    fetchData();
  }, [fetchTrigger]);
  const nextId = data.artifacts.length + 1;

  const artifactUi = data.artifacts.map((x) => (
    <Grid item key={x.Id} xs={4}>
      <ArtifactDisplay artifact={x}></ArtifactDisplay>
    </Grid>
  ));
  return (
    <Router>
      <Switch>
        <Route path="/">
          <NewArtifact
            onSubmit={(x) => onSubmit(x, nextId, data, setFetchTrigger)}
          ></NewArtifact>
          <Grid container spacing={2}>
            {artifactUi}
          </Grid>
        </Route>
      </Switch>
    </Router>
  );
}

async function onSubmit(
  newArtifact: Artifact,
  newId: number,
  data: Data,
  triggerFetch: React.Dispatch<React.SetStateAction<number>>
): Promise<void> {
  newArtifact.Id = newId;
  data.artifacts.push(newArtifact);
  await fetch("http://dumb-storage.dev.k8s.j5/genshin", {
    method: "POST",
    body: JSON.stringify(data),
  });
  triggerFetch(Math.random());
}

export default App;
