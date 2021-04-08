import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import NewArtifact from "./components/NewArtifact";
import { Artifact } from "./data/Artifact";
import { AppBar, Button, Grid } from "@material-ui/core";
import ArtifactList from "./components/ArtifactList";

function App() {
  const [artifacts, setArtifacts] = useState<Artifact[]>([]);
  const [fetchTrigger, setFetchTrigger] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch("http://genshin-api.dev.k8s.j5/artifact");
      setArtifacts(await result.json());
    };

    fetchData();
  }, [fetchTrigger]);

  return (
    <Router>
      <AppBar position="sticky">
        <Grid container spacing={2} justify="space-around">
          <Grid item xs={6}>
            <Button>
              <Link to="/artifact-list">Artifact List</Link>
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button>
              <Link to="/new-artifact">New Artifact</Link>
            </Button>
          </Grid>
        </Grid>
      </AppBar>
      <Switch>
        <Route path="/new-artifact">
          <NewArtifact
            onSubmit={(x) => onSubmit(x, artifacts, setFetchTrigger)}
          ></NewArtifact>
        </Route>
        <Route path="/artifact-list">
          <ArtifactList artifacts={artifacts} />
        </Route>
      </Switch>
    </Router>
  );
}

async function onSubmit(
  newArtifact: Artifact,
  artifacts: Artifact[],
  triggerFetch: React.Dispatch<React.SetStateAction<number>>
): Promise<void> {
  var response = await fetch("http://genshin-api.dev.k8s.j5/artifact", {
    method: "POST",
    body: JSON.stringify(newArtifact),
  });
  var artifact = await response.json();
  artifacts.push(artifact);
  triggerFetch(Math.random());
}

export default App;
