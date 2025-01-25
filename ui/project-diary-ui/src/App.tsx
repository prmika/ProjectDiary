import { useEffect, useState } from "react";
import "./App.css";
import { Markup, Project } from "./classes/Project";
import DiaryWidget from "./components/DiaryWidget";
import { db, auth } from "./config/firebaseConfig";
import { collection, getDocs, addDoc } from "firebase/firestore";
import Login from "./components/views/Login";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [showAddProjectForm, setShowAddProjectForm] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchProjects = async () => {
    const querySnapshot = await getDocs(collection(db, "projects"));
    const projectsData = await Promise.all(
      querySnapshot.docs.map(async (doc) => {
        const projectData = { id: doc.id, ...doc.data() } as Project;
        const markupsSnapshot = await getDocs(
          collection(db, "projects", doc.id, "markups")
        );
        const markupsData = markupsSnapshot.docs.map((markupDoc) => ({
          id: markupDoc.id,
          ...markupDoc.data(),
        }));
        projectData.markups = markupsData as Markup[];
        return projectData;
      })
    );
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
      const projectRef = await addDoc(collection(db, "projects"), {
        name: project.name,
        description: project.description,
        projectedHours: project.projectedHours,
      });

      // Initialize the markups subcollection
      const markupsRef = collection(db, "projects", projectRef.id, "markups");
      await addDoc(markupsRef, {});

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
    return <Login onLogin={setUser} />;
  }

  return (
    <>
      <div className="header">
        <h1>Project Diary</h1>
        <div>
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
      />
    </>
  );
}

export default App;
