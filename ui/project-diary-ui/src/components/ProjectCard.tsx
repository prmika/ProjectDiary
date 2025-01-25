import React, { useState } from "react";
import styled from "styled-components";
import { Markup, Project } from "../classes/Project";
import MetaDataForm from "./MetaDataForm";
import { FormFieldMetadata, markupMetadata, ProjectMetadata } from "../config/Metadata";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { FaPlus, FaPen } from "react-icons/fa";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [showMetaDataForm, setShowMetaDataForm] = useState(false);
  const [formMetadata, setFormMetaData] = useState<FormFieldMetadata>({});
  const [isEdit, setIsEdit] = useState(false);

  const truncateDescription = (description: string, maxLength: number) => {
    if (description.length <= maxLength) return description;
    return description.substring(0, maxLength) + "...";
  };
  const hoursMarked = (project.markups || []).reduce(
    (acc, markup) => acc + markup.hours,
    0
  );
  const showMarkups = () => {
    console.log(project.markups);
  };
  const handleSubmit = (data: any) => {
    console.log(data)

  };
  const addMarkup = async (markup: Markup) => {
    try {
      const projectId = project.id as string;
      const markupsRef = collection(db, "projects", projectId, "markups");
      await addDoc(markupsRef, markup);

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
              <div className="text">Add</div>
            </button>
            <div className="card__acounts">
              <svg viewBox="0 0 128 128">
                <circle r={60} fill="#ffd8c9" cy={64} cx={64}>
                  <text x="50%" y="50%" textAnchor="middle" dy=".3em">
                    {project.markups?.length}
                  </text>
                </circle>
              </svg>
            </div>
            <div className="card__acounts">
              <svg viewBox="0 0 128 128">
                <circle r={60} fill="#ff8475" cy={64} cx={64} />
              </svg>
            </div>
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
          <div className="card__subtitle">
            {truncateDescription(project.description, 200)}
          </div>
        )}
        <div className="card__bottom">
          <div className="card__indicator">
            <span className="card__indicator-amount">
              {project.projectedHours}
            </span>{" "}
            / <span className="card__indicator-percentage">{hoursMarked}</span>
          </div>
          <div className="card__progress">
            <progress max={project.projectedHours} value={hoursMarked} />
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`

  .card__wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
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
    color: #fff;
    width: 40px;
    height: 40px;
    border-radius: 100%;
    background: var(--main-color);
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
    margin-top: auto;
  }
  .card__subtitle {
    margin-top: 15px;
    font-weight: 400;
    font-size: 15px;
    color: var(--main-color);
  }

  .card__indicator {
    margin-top: 50px;
    font-weight: 500;
    font-size: 14px;
    color: var(--main-color);
  }

  .card__progress progress {
    width: 100%;
    height: 4px;
    border-radius: 100px;
  }

  .card__progress progress::-webkit-progress-bar {
    background-color: #00000030;
    border-radius: 100px;
  }

  .card__progress progress::-webkit-progress-value {
    background-color: var(--main-color);
    border-radius: 100px;
  }

  .Btn {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 40px;
    height: 40px;
    border-radius: calc(45px/2);
    border: none;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition-duration: .3s;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.199);
    background: #000000;
  }

  .sign {
    width: 100%;
    font-size: 1.5em;
    color: white;
    transition-duration: .3s;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .text {
    position: absolute;
    right: 0%;
    width: 0%;
    opacity: 0;
    color: white;
    font-size: 1.4em;
    font-weight: 500;
    transition-duration: .3s;
  }

  .Btn:hover {
    width: 9em;
    transition-duration: .3s;
  }

  .Btn:hover .sign {
    width: 30%;
    transition-duration: .3s;
  }

  .Btn:hover .text {
    opacity: 1;
    width: 50%;
    transition-duration: .3s;
  }

  .Btn:active {
    transform: translate(2px ,2px);
  
`;

export default ProjectCard;
