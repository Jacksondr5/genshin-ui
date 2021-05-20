import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import NewArtifact from "./components/NewArtifact";
import { Artifact } from "./data/Artifact";
import { AppBar, Button, Grid } from "@material-ui/core";
import ArtifactList from "./components/ArtifactList";
import CharacterList from "./components/CharacterList";

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
          <GridLink route="/artifact-list" title="Artifact List" />
          <GridLink route="/new-artifact" title="New Artifact" />
          <GridLink route="/character-list" title="Character List" />
          {/* <GridLink route="/new-loadout" title="New Loadout" /> */}
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
        <Route path="/new-loadout">
          <div></div>
        </Route>
        <Route path="/character-list">
          <CharacterList artifacts={artifacts} />
        </Route>
      </Switch>
    </Router>
  );
}

function GridLink(props: { route: string; title: string }) {
  return (
    <Grid item xs={3}>
      <Button>
        <Link to={props.route}>{props.title}</Link>
      </Button>
    </Grid>
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
