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
}

const DiaryWidget: React.FC<DiaryWidgetProps> = ({
  projects,
  addProject,
  setShowAddProjectForm,
  showAddProjectForm,
}) => {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300); // 300ms debounce timeout

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

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
  } else {
    return (
      <StyledWrapper>
        <input
          className="input"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search projects"
        />
        <div className="project-list">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      </StyledWrapper>
    );
  }
};

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  .project-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 2rem;
    margin-right: 2rem;
    margin-left: 2rem;
  }
`;

export default DiaryWidget;
