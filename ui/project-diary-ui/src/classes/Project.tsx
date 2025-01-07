export interface Project {
    name: string;
    description: string;
    projectedHours: number;
    markups: Markup[];
  }

export interface Markup {
    date: string;
    hours: number;
    description: string;
  }
