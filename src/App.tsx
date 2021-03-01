import React from "react";
import logo from "./logo.svg";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import NewArtifact from "./components/NewArtifact";
import { Artifact, ArtifactStatType } from "./data/Artifact";
import ArtifactDisplay from "./components/ArtifactDisplay";

function App() {
  var artifact: Artifact = {
    Level: 4,
    MainStat: { StatName: 2, StatType: ArtifactStatType.MainStat, Value: 5 },
    Quality: 5,
    Set: 2,
    SubStats: [{ StatName: 2, StatType: ArtifactStatType.SubStat, Value: 5 }],
    Type: 3,
  };
  return (
    <Router>
      <Switch>
        <Route path="/">
          <NewArtifact onSubmit={onSubmit}></NewArtifact>
          <ArtifactDisplay artifact={artifact}></ArtifactDisplay>
        </Route>
      </Switch>
    </Router>
  );
}

function onSubmit(newArtifact: Artifact): void {}

export default App;
