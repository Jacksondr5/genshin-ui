export interface Loadout {
  circletId: number;
  clockId: number;
  cupId: number;
  featherId: number;
  flowerId: number;
  id: number;
  name: string;
}

export interface Character {
  loadouts: Loadout[];
  id: number;
  name: string;
}
