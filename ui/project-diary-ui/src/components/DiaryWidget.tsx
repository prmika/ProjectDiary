import React, { useEffect, useState } from "react";
import { Project } from "../classes/Project";
import ProjectCard from "./ProjectCard";
import styled from "styled-components";
import MetaDataForm from "./MetaDataForm";
import { ProjectMetadata } from "../config/Metadata";

interface DiaryWidgetProps {
  projects: Project[];
  addProject: (project: Project) => void;
  setShowAddProjectForm: (show: boolean) => void;
  showAddProjectForm: boolean;
  searchText: string;
}

const DiaryWidget: React.FC<DiaryWidgetProps> = ({
  projects,
  addProject,
  setShowAddProjectForm,
  showAddProjectForm,
  searchText,
}) => {
  const [debouncedSearch, setDebouncedSearch] = useState(searchText);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchText);
    }, 300); // 300ms debounce timeout

    return () => {
      clearTimeout(handler);
    };
  }, [searchText]);

  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  const asd = () => {
    if (showAddProjectForm) {
      return (
        <StyledWrapper>
          <div className="card">
            <MetaDataForm
              onClose={() => setShowAddProjectForm(false)}
              onSubmit={addProject}
              formMetadata={ProjectMetadata}
            />
          </div>
        </StyledWrapper>
      );
    } else if (selectedProject) {
      return <ProjectCard project={selectedProject} />;
    } else {
      return (
        <div
          className="card"
          style={{ textAlign: "center", justifyContent: "center" }}
        >
          <h1>Empty card...</h1>
          <div className="card-content">...Please choose a project</div>
        </div>
      );
    }
  };
  return (
    <StyledWrapper>
      {/* left sidebar 1/10 width of the screen */}
      <div className="left-sidebar">Mainoksia tai jotain muuta</div>
      {/* main content 6/10 width of the screen */}
      <div className="content">{asd()}</div>
      {/* right sidebar 3/10 width of the screen */}
      <div className="right-sidebar">
        <div className="project-list">
          {filteredProjects.map((project, index) => (
            <div
              key={index}
              className="project-list-item"
              onClick={() => setSelectedProject(project)}
            >
              <h3>{project.name}</h3>
              <p>{project.description}</p>
            </div>

            // <ProjectCard key={index} project={project} />
          ))}
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  gap: 5rem;

  .left-sidebar {
    width: 10%;
    margin-left: 2rem;
  }
  .project-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 90%;
  }

  .project-list-item {
    cursor: pointer;
  }

  .content {
    width: 60%;
    display: flex;
    flex-direction: column;
  }

  .right-sidebar {
    align-items: center;
    width: 30%;
    max-height: 92vh;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`;

export default DiaryWidget;
