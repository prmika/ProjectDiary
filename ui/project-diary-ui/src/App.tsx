import { useEffect, useState } from "react";
import "./App.css";
import { Project } from "./classes/Project";
import DiaryWidget from "./components/DiaryWidget";
import Login from "./components/views/Login";
import { onAuthStateChanged } from "firebase/auth";
import ThemeToggle from "./components/ThemeToggle";
import { getAllProjects, postProject } from "./api/api";
import { auth } from "./config/firebaseConfig";

function App() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [showAddProjectForm, setShowAddProjectForm] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("Auth changed!", user);
      setUser(user);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const fetchProjects = async () => {
    const projectsData = await getAllProjects();
    console.log(projectsData);
    setProjects(projectsData);
  };

  useEffect(() => {
    if (user) {
      fetchProjects();
    }
  }, [user]);

  const addProject = async (project: Project) => {
    try {
      const projectRef = await postProject(project);

      setProjects([
        ...projects,
        { ...project, id: projectRef.id, markups: [] },
      ]);
      setShowAddProjectForm(false);
    } catch (error) {
      console.error("Error adding project: ", error);
    }
  };

  if (!user) {
    return (
      <>
        <div className="header">
          <h1>Project Diary</h1>
        </div>
        <div className="card-container" style={{ justifyContent: "center" }}>
          <div className="content" style={{ textAlign: "center" }}>
            <Login />;
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="header">
        <h1>Project Diary</h1>
        <input
          className="input"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search projects"
        />
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <ThemeToggle />
          <button
            className="button"
            onClick={() => setShowAddProjectForm(!showAddProjectForm)}
          >
            Add new project
          </button>
          <button className="button" onClick={() => auth.signOut()}>
            Sign out
          </button>
        </div>
      </div>
      <DiaryWidget
        projects={projects}
        addProject={addProject}
        showAddProjectForm={showAddProjectForm}
        setShowAddProjectForm={setShowAddProjectForm}
        searchText={search}
      />
    </>
  );
}

export default App;
