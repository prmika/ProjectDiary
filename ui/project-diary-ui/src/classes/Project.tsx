export interface Project {
  id?: string;
  name: string;
  description: string;
  projectedHours: number;
  markups: Markup[];
}

export interface Markup {
  id?: string;
  date: Date;
  hours: number;
  description: string;
}
