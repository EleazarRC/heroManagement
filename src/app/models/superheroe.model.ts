export interface Superhero {
    id: number;
    photo: string;
    alias: string;
    name: string;
    strength: ElementType[];
    weakness: ElementType[];
    personality: Personality;
    specialAbility: string;
    active: boolean;
  }
  
  export enum ElementType {
    Water = 'Water',
    Earth = 'Earth',
    Fire = 'Fire',
    Air = 'Air'
  }
  
  export enum Personality {
    Ally = 'Ally',
    Villain = 'Villain'
  }