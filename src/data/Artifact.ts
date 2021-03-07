export interface ListableItem {
  key: number;
  value: string;
}
export const InvalidListableItem: ListableItem = {
  key: -1,
  value: "INVALID DATA",
};

export const ArtifactTypes: ListableItem[] = [
  { key: 0, value: "Flower" },
  { key: 1, value: "Feather" },
  { key: 2, value: "Cup" },
  { key: 3, value: "Clock" },
  { key: 4, value: "Circlet" },
];

export const ArtifactSets: ListableItem[] = [
  { key: 0, value: "Archeic Petra" },
  { key: 1, value: "Blizzard Strayer" },
  { key: 2, value: "Bloodstained Chivalry" },
  { key: 4, value: "Hydro" },
  { key: 5, value: "Glatiator's Finale" },
  { key: 6, value: "Maiden Beloved" },
  { key: 7, value: "Noblesse Oblige" },
  { key: 8, value: "Thundering Fury" },
  { key: 9, value: "Viradecent Venerer" },
  { key: 10, value: "Thundersoother" },
  { key: 11, value: "Heart of Depth" },
  { key: 12, value: "Resolution of Sojourner" },
  { key: 13, value: "Defender's Will" },
  { key: 14, value: "Berserker" },
  { key: 15, value: "Martial Artist" },
  { key: 16, value: "Instructor" },
  { key: 17, value: "Gambler" },
  { key: 18, value: "The Exile" },
  { key: 19, value: "Adventurer" },
  { key: 21, value: "Lucky Dog" },
  { key: 22, value: "Scholar" },
  { key: 23, value: "Traveling Doctor" },
  { key: 24, value: "Lavawalker" },
  { key: 25, value: "Wanderer's Troupe" },
  { key: 26, value: "Crimson Witch of Flames" },
  { key: 27, value: "Retracing Bolide" },
];

export const MainStatNames: ListableItem[] = [
  { key: 0, value: "Anemo" },
  { key: 1, value: "Attack Flat" },
  { key: 2, value: "Attack %" },
  { key: 3, value: "Crit Damage" },
  { key: 4, value: "Crit Rate" },
  { key: 5, value: "Cryo" },
  { key: 6, value: "Defence %" },
  { key: 7, value: "Electro" },
  { key: 8, value: "Elemental Mastery" },
  { key: 9, value: "Energy Recharge" },
  { key: 10, value: "Geo" },
  { key: 11, value: "Healing Bonus" },
  { key: 12, value: "Hp Flat" },
  { key: 13, value: "Hp %" },
  { key: 14, value: "Hydro" },
  { key: 15, value: "Pyro" },
  { key: 16, value: "Physical" },
];

export const SubStatNames: ListableItem[] = [
  { key: 0, value: "Attack Flat" },
  { key: 1, value: "Attack %" },
  { key: 2, value: "Crit Damage" },
  { key: 3, value: "Crit Rate" },
  { key: 4, value: "Defence Flat" },
  { key: 5, value: "Defence %" },
  { key: 6, value: "Elemental Mastery" },
  { key: 7, value: "Energy Recharge" },
  { key: 8, value: "Hp Flat" },
  { key: 9, value: "Hp %" },
  { key: 10, value: "None" },
];

export enum ArtifactStatType {
  MainStat,
  SubStat,
}

export interface ArtifactStat {
  StatType: ArtifactStatType;
  StatName: number;
  Value: number;
}

export interface Artifact {
  Id: number;
  Type: number;
  Set: number;
  Level: number;
  Quality: number;
  MainStat: ArtifactStat;
  SubStats: ArtifactStat[];
}
