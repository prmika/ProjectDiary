import React, { useState } from "react";
import styled from "styled-components";
import { Markup, Project } from "../classes/Project";
import MetaDataForm from "./MetaDataForm";
import {
  FormFieldMetadata,
  markupMetadata,
  ProjectMetadata,
} from "../config/Metadata";
import { FaPlus, FaPen } from "react-icons/fa";
import { editProject, postMarkup } from "../api/api";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [showMetaDataForm, setShowMetaDataForm] = useState(false);
  const [formMetadata, setFormMetaData] = useState<FormFieldMetadata>({});
  const [isEdit, setIsEdit] = useState(false);

  const hoursMarked = (project.markups || []).reduce(
    (acc, markup) => acc + markup.hours,
    0
  );
  const showMarkups = () => {
    console.log(project.markups);
  };
  const modifyProject = async (project: Project) => {
    await editProject(project);
  };
  const handleSubmit = async (data: any) => {
    try {
      console.log("data", data);
      console.log((data as Project).id);
      if ((data as Project).id !== undefined) {
        isEdit
          ? await modifyProject(data)
          : /*addProject(data)*/ console.log("add", data);
      }
      if ((data as Markup).hours !== undefined) {
        isEdit
          ? /*editMarkup(data)*/ console.log("edit", data)
          : addMarkup(data);
      }
    } catch (error) {
      console.error("Error adding in handleSubmit: ", error);
    }
  };
  const addMarkup = async (markup: Markup) => {
    try {
      const projectId = project.id as string;
      await postMarkup(projectId, markup);

      // Update the local state
      project.markups = [...project.markups, markup];
      setShowMetaDataForm(false);
    } catch (error) {
      console.error("Error adding markup: ", error);
    }
  };
  const addMetaData = (edit: boolean, metaData: FormFieldMetadata) => {
    if (showMetaDataForm === true) {
      setIsEdit(false);
      setFormMetaData({});
      setShowMetaDataForm(false);
      return;
    }
    setIsEdit(edit);
    setFormMetaData(metaData);
    setShowMetaDataForm(true);
  };
  return (
    <StyledWrapper>
      <div className="card">
        <div className="card__wrapper">
          <div className="card___wrapper-acounts" onClick={() => showMarkups()}>
            <button
              className="Btn"
              onClick={() => addMetaData(false, markupMetadata)}
            >
              <FaPlus className="sign" />
              <div className="text">Markup</div>
            </button>
          </div>
          <button
            className="Btn"
            onClick={() => addMetaData(true, ProjectMetadata)}
          >
            <FaPen className="sign" />
            <div className="text">Edit</div>
          </button>
        </div>
        <div className="card__title">{project.name}</div>
        {showMetaDataForm ? (
          <MetaDataForm
            onSubmit={handleSubmit}
            formMetadata={formMetadata}
            onClose={() => setShowMetaDataForm(false)}
            isEdit={isEdit}
            editableObject={project}
          />
        ) : (
          <>
            <div className="card__subtitle">{project.description}</div>
            <div className="card__bottom">
              <div className="card__indicator">
                <span className="card__indicator-amount">
                  {project.projectedHours}
                </span>{" "}
                /{" "}
                <span className="card__indicator-percentage">
                  {hoursMarked}
                </span>
              </div>
              <div className="card__progress">
                <progress max={project.projectedHours} value={hoursMarked} />
              </div>
            </div>
          </>
        )}
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .card__wrapper {
    display: flex;
    margin: 0.5em;
    justify-content: space-between;
  }

  .card___wrapper-acounts {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    z-index: 1;
    cursor: pointer;
  }

  .card___wrapper-acounts > div:nth-child(2) {
    position: absolute;
    left: 25px;
    z-index: -1;
  }

  .card___wrapper-acounts > div:nth-child(3) {
    position: absolute;
    left: 50px;
    z-index: -2;
  }

  .card__score {
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 500;
    font-size: 16px;
    color: var(--text-color);
    width: 40px;
    height: 40px;
    border-radius: 100%;
    background: var(--text-color);
  }

  .card__acounts {
    width: 42px;
    height: 42px;
  }

  .card__acounts svg {
    width: 100%;
    height: 100%;
  }

  .card__title {
    margin-top: 50px;
    font-weight: 900;
    font-size: 25px;
    color: var(--accent-color);
  }

  .card__bottom {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: auto;
    margin-bottom: 1em;
  }
  .card__subtitle {
    margin-top: 15px;
    font-weight: 400;
    font-size: 15px;
    color: var(--text-color);
  }

  .card__indicator {
    color: var(--text-color);
    font-size: 1.5em;
    margin-bottom: 0.5em;
  }
  .card__progress {
    width: 90%;
  }

  .card__progress progress {
    height: 4px;
    border-radius: 100px;
    width: 100%;
  }

  .card__progress progress::-webkit-progress-bar {
    background-color: var(--text-color);
    border-radius: 100px;
  }

  .card__progress progress::-webkit-progress-value {
    background-color: var(--accent-color);
    border-radius: 100px;
  }

  .Btn {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 40px;
    height: 40px;
    border-radius: calc(45px / 2);
    border: none;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition-duration: 0.3s;
    background: var(--button-background);
  }

  .sign {
    width: 100%;
    font-size: 1.5em;
    color: var(--text-color);
    transition-duration: 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .text {
    position: absolute;
    right: 5%;
    opacity: 0;
    color: var(--text-color);
    font-size: 1.4em;
    font-weight: 500;
    transition-duration: 0.3s;
  }

  .Btn:hover {
    width: 10em;
    transition-duration: 0.3s;
  }

  .Btn:hover .sign {
    width: 30%;
    transition-duration: 0.3s;
  }

  .Btn:hover .text {
    opacity: 1;
    width: 50%;
    transition-duration: 0.3s;
  }

  .Btn:active {
    transform: translate(2px, 2px);
  }
`;

export default ProjectCard;
