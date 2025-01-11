export interface Project {
    name: string;
    description: string;
    projectedHours: number;
    markups: Markup[];
  }

export interface Markup {
    date: Date;
    hours: number;
    description: string;
  }
