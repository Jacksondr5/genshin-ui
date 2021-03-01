export const ArtifactTypes: { [name: number]: string } = {
  0: "Flower",
  1: "Feather",
  2: "Cup",
  3: "Clock",
  4: "Circlet",
};

export const ArtifactSets: { [name: number]: string } = {
  0: "ArcheicPetra",
  1: "Blizzard",
  2: "Bloodstained",
  3: "Crimson",
  4: "Hydro",
  5: "Glatiators",
  6: "Maiden",
  7: "Noblesse",
  8: "ThunderingFury",
  9: "Viradecent",
};

export const MainStatNames: { [name: number]: string } = {
  0: "AnemoDamage",
  1: "AttackFlat",
  2: "AttackPercentage",
  3: "CritDamage",
  4: "CritRate",
  5: "CryoDamage",
  6: "DefencePercentage",
  7: "ElectroDamage",
  8: "ElementalMastery",
  9: "EnergyRecharge",
  10: "GeoDamage",
  11: "HealingBonus",
  12: "HpFlat",
  13: "HpPercentage",
  14: "HydroDamage",
  15: "PyroDamage",
  16: "PhysicalDamage",
};

export const SubStatNames: { [name: number]: string } = {
  0: "AttackFlat",
  1: "AttackPercentage",
  2: "CritDamage",
  3: "CritRate",
  4: "DefencePercentage",
  5: "ElementalMastery",
  6: "EnergyRecharge",
  7: "HpFlat",
  8: "HpPercentage",
};

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
  Type: number;
  Set: number;
  Level: number;
  Quality: number;
  MainStat: ArtifactStat;
  SubStats: ArtifactStat[];
}
