import React from "react";
import { Project } from "../classes/Project";
import Card from "./Card";
import styled from "styled-components";

interface DiaryWidgetProps {
  projects: Project[];
}

const DiaryWidget: React.FC<DiaryWidgetProps> = ({ projects }) => {
  return (
    <StyledWrapper>
      <div>
        <h2>Projects</h2>
        <div className="project-list">
          {projects.map((project, index) => (
            <Card key={index} project={project}/>
          ))}
        </div>
      </div>
    </StyledWrapper>
  );
};
const StyledWrapper = styled    .div`
  .project-list {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }
`;

export default DiaryWidget;
