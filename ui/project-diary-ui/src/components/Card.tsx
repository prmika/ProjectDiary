import React from "react";
import styled from "styled-components";
import { Project } from "../classes/Project";

interface CardProps {
  project: Project;
}

const Card: React.FC<CardProps> = ({ project }) => {
  const truncateDescription = (description: string, maxLength: number) => {
    if (description.length <= maxLength) return description;
    return description.substring(0, maxLength) + "...";
  };
  const hoursMarked = project.markups.reduce(
    (acc, markup) => acc + markup.hours,
    0
  );
  const showMarkups = () => {
    console.log(project.markups);
  };
  const addMarkup = () => {
    console.log("Add markup");
  };
  return (
    <StyledWrapper>
      <div className="card">
        <div className="card__wrapper">
          <div className="card___wrapper-acounts" onClick={() => showMarkups()}>
            <div className="card__score">+{project.markups.length}</div>
            <div className="card__acounts">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
                <circle r={60} fill="#ffd8c9" cy={64} cx={64} />
              </svg>
            </div>
            <div className="card__acounts">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
                <circle r={60} fill="#ff8475" cy={64} cx={64} />
              </svg>
            </div>
          </div>
          <button className="Btn" onClick={() => addMarkup()}>
            <div className="sign">+</div>
            <div className="text">Add</div>
          </button>
        </div>
        <div className="card__title">{project.name}</div>
        <div className="card__subtitle">
          {truncateDescription(project.description, 300)}
        </div>
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
  .card {
    --main-color: #000;
    --bg-color: #ebd18d;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
      Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
      sans-serif;
    width: 300px;
    min-height: 400px;
    padding: 25px;
    background: var(--bg-color);
    border-radius: 20px;
    display: flex;
    flex-direction: column;
  }

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
    color: var(--main-color);
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
    width: 45px;
    height: 45px;
    border-radius: calc(45px/2);
    border: none;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition-duration: .3s;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.199);
    background: linear-gradient(144deg,#af40ff,#5b42f3 50%,#00ddeb);
  }

  /* plus sign */
  .sign {
    width: 100%;
    font-size: 2.2em;
    color: white;
    transition-duration: .3s;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  /* text */
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
  /* hover effect on button width */
  .Btn:hover {
    width: 9em;
    transition-duration: .3s;
  }

  .Btn:hover .sign {
    width: 30%;
    transition-duration: .3s;
  }
  /* hover effect button's text */
  .Btn:hover .text {
    opacity: 1;
    width: 50%;
    transition-duration: .3s;
  }
  /* button click effect*/
  .Btn:active {
    transform: translate(2px ,2px);
  
`;

export default Card;
