export type FormFieldMetadata = {
  [key: string]: {
    id: string;
    placeholder: string;
    name: string;
    inputType?: string;
    type: string;
    rows?: number;
    maxLength?: number;
    required?: boolean;
  };
};

export const markupMetadata = {
  hours: {
    id: "Hours",
    placeholder: "Enter used hours",
    name: "hours",
    inputType: "number",
    type: "input",
    required: true,
  },
  description: {
    id: "Description",
    name: "description",
    placeholder: "Enter description",
    rows: 10,
    maxLength: 1024,
    type: "textarea",
  },
  date: {
    id: "Date",
    name: "date",
    placeholder: "Enter date",
    type: "date",
    required: true,
  },
};

export const ProjectMetadata = {
  name: {
    id: "Name",
    name: "name",
    placeholder: "Enter project name",
    type: "input",
    required: true,
  },
  description: {
    id: "Description",
    name: "description",
    placeholder: "Enter project description",
    rows: 10,
    maxLength: 1024,
    type: "textarea",
    required: true,
  },
  projectedHours: {
    id: "Projected Hours",
    name: "projectedHours",
    placeholder: "Enter projected hours",
    type: "input",
    required: true,
  },
};
