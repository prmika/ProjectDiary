import React, { useState } from "react";
import styled from "styled-components";
import { Project } from "../classes/Project";

interface ProjectAddFormProps {
  onClose: () => void;
  addProject: (project: Project) => void;
}

const ProjectAddForm: React.FC<ProjectAddFormProps> = ({
  onClose,
  addProject,
}) => {
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectedHours, setProjectedHours] = useState<number | undefined>(
    undefined
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const project: Project = {
      name: projectName,
      description: projectDescription,
      projectedHours: projectedHours || 0,
      markups: [],
    };
    addProject(project);
    onClose();
  };

  return (
    <StyledWrapper>
      <div className="card">
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="projectName">Project Name: {projectName}</label>
            <input
              type="text"
              id="projectName"
              name="projectName"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="Enter project name"
              required
            />
            <label htmlFor="projectedHours">
              Projected Hours: {projectedHours}
            </label>
            <input
              type="number"
              id="projectedHours"
              name="projectedHours"
              placeholder="Enter projected hours"
              value={projectedHours}
              onChange={(e) => setProjectedHours(parseInt(e.target.value))}
              required
              onWheel={(e) => (e.target as HTMLInputElement).blur()}
            />
            <label htmlFor="projectDescription">Description:</label>
            <textarea
              id="projectDescription"
              name="projectDescription"
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
              rows={10}
              maxLength={1024}
              placeholder="Enter project description"
            />
          </div>
          <div className="button-container">
            <button
              className="form-submit-btn cancel-btn"
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>
            <button className="form-submit-btn" type="submit">
              Add
            </button>
          </div>
        </form>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  .form {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .form-group {
    display: flex;
    flex-direction: column;
  }

  .form-group label {
    font-weight: 600;
    font-size: 1em;
    margin-bottom: 1em;
  }

  .form-group input {
    padding: 1em 12px;
    border-radius: 12px;
    font-size: 1em;
    font-family: inherit;
    background-color: transparent;
    margin-bottom: 1em;
  }

  .form-group textarea {
    padding: 1em 12px;
    border-radius: 12px;
    resize: none;
    font-size: 1em;
    height: 4em;
    background-color: transparent;
  }

  .form-group input::placeholder {
    opacity: 0.5;
  }

  .form-group input:focus {
    outline: none;
    border-color: #e81cff;
  }

  .form-group textarea:focus {
    outline: none;
    border-color: #e81cff;
  }

  .button-container {
    display: flex;
    justify-content: space-between;
    margin-top: 3em;
  }

  .form-submit-btn {
    justify-content: center;
    font-family: inherit;
    color: white;
    width: 40%;
    background: #000000;
    border: 1px solid #4caf50;
    padding: 12px 16px;
    cursor: pointer;
    border-radius: 12px;
  }

  .form-submit-btn:hover {
    background-color: #4caf50;
  }
  .cancel-btn {
    border: 1px solid #cc0000;
  }

  .cancel-btn:hover {
    background-color: #cc0000;
  }
`;

export default ProjectAddForm;
