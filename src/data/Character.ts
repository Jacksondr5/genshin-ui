import { Artifact } from "./Artifact";

export interface CharacterArtifactSet {
  Flower: Artifact;
  Feather: Artifact;
  Cup: Artifact;
  Clock: Artifact;
  Circlet: Artifact;
}

export interface Character {
  Name: string;
  Artifacts: CharacterArtifactSet[];
}
