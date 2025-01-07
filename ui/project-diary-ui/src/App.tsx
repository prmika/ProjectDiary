import { useEffect, useState } from "react";
import "./App.css";
import ProjectAddForm from "./components/ProjectAddForm";
import { Project } from "./classes/Project";
import DiaryWidget from "./components/DiaryWidget";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  useEffect(() => {
    const project = {
      name: "Project 1",
      description:
        "This is a test project. This is a test project 1. This is a test project 2. This is a test project 3. This is a test project 4. This is a test project 5. This is a test project 6. This is a test project 7. This is a test project 8. This is a test project 9. This is a test project 10.",
      projectedHours: 102,
      markups: [
        {
          date: "2021-01-01",
          hours: 10,
          description: "This is a test markup.",
        },
        {
          date: "2021-01-02",
          hours: 10,
          description: "This is a test markup.",
        },
        {
          date: "2021-01-03",
          hours: 10,
          description: "This is a test markup.",
        },
      ],
    };
    setProjects([project]);
  }, []);

  const addProject = (project: Project) => {
    setProjects([...projects, project]);
  };
  return (
    <>
      {showForm ? (
        <ProjectAddForm
          onClose={() => setShowForm(false)}
          addProject={addProject}
        />
      ) : (
        <>
          <h1>Project Diary</h1>
          <DiaryWidget projects={projects} />
          <button className="button" onClick={() => setShowForm(true)}>
            Add new project
          </button>
        </>
      )}
    </>
  );
}

export default App;
