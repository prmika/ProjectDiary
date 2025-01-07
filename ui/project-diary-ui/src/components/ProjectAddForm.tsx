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
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const project: Project = {
      name: (e.target as HTMLFormElement).projectName.value,
      description: (e.target as HTMLFormElement).projectDescription.value,
      projectedHours: 0,
      markups: [],
    };
    addProject(project);
    onClose();
  };

  return (
    <StyledWrapper>
      <div className="form-container">
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="projectName">Project Name:</label>
            <input
              type="text"
              id="projectName"
              name="projectName"
              placeholder="Enter project name"
              required
            />
            <label htmlFor="projectedHours">Projected Hours:</label>
            <input
              type="number"
              id="projectedHours"
              name="projectedHours"
              placeholder="Enter projected hours"
              required
            />
            <label htmlFor="projectDescription">Description:</label>
            <textarea
              id="projectDescription"
              name="projectDescription"
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
  .form-container {
    width: 600px;
    --main-color: #000;
    --bg-color: #ebd18d;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
      Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
      sans-serif;
    padding: 25px;
    background: var(--bg-color);
    border-radius: 20px;
  }

  .button-container {
    display: flex;
    justify-content: space-between;
  }
  .form-container button:active {
    scale: 0.95;
  }

  .form-container .form {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .form-container .form-group {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .form-container .form-group label {
    display: block;
    margin-bottom: 5px;
    color: #ff8475;
    font-weight: 600;
    font-size: 2em;
  }

  .form-container .form-group input {
    padding: 1em 12px;
    border-radius: 12px;
    font-size: 2em;
    color: #fff;
    font-family: inherit;
    background-color: transparent;
    border: 1px solid #414141;
  }

  .form-container .form-group textarea {
    padding: 1em 12px;
    border-radius: 12px;
    resize: none;
    font-size: 2em;
    color: #fff;
    height: 4em;
    border: 1px solid #414141;
    background-color: transparent;
    font-family: inherit;
  }

  .form-container .form-group input::placeholder {
    opacity: 0.5;
  }

  .form-container .form-group input:focus {
    outline: none;
    border-color: #e81cff;
  }

  .form-container .form-group textarea:focus {
    outline: none;
    border-color: #e81cff;
  }

  .form-container .form-submit-btn {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    align-self: flex-start;
    font-family: inherit;
    color: #000000
    font-weight: 600;
    width: 40%;
    background: #313131;
    border: 1px solid #4caf50;
    padding: 12px 16px;
    font-size: inherit;
    gap: 8px;
    margin-top: 8px;
    cursor: pointer;
    border-radius: 12px;
  }

  .form-container .form-submit-btn:hover {
    background-color: #4caf50;

  }
  .form-container .cancel-btn {
    background: #313131;
    border: 1px solid #cc0000;
  }

  .form-container .cancel-btn:hover {
    background-color: #cc0000;
  }
`;

export default ProjectAddForm;
