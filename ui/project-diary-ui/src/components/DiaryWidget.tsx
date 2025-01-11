import React, { useEffect, useState } from "react";
import { Project } from "../classes/Project";
import Card from "./Card";
import styled from "styled-components";

interface DiaryWidgetProps {
  projects: Project[];
}

const DiaryWidget: React.FC<DiaryWidgetProps> = ({ projects }) => {
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
          <Card key={index} project={project} />
        ))}
      </div>
    </StyledWrapper>
  );
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
  }
`;

export default DiaryWidget;
