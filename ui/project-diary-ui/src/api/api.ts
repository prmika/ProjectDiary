import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
} from "firebase/firestore";
import { Markup, Project } from "../classes/Project";
import { auth, db } from "../config/firebaseConfig";

const getUserId = () => {
  const userId = auth.currentUser?.uid;
  if (!userId) {
    throw new Error("User not logged in");
  }
  return userId;
};

// Projects
export const postProject = async (project: Project) => {
  const userId = getUserId();
  const projectRef = await addDoc(collection(db, "projects"), {
    name: project.name,
    description: project.description,
    projectedHours: project.projectedHours,
    userId: userId,
  });
  return projectRef;
};

export const editProject = async (project: Project) => {
  const projectId = project.id as string;
  const projectDocRef = doc(db, "projects", projectId);
  console.log("asd", projectDocRef);
  await updateDoc(projectDocRef, {
    name: project.name,
    description: project.description,
    projectedHours: project.projectedHours,
  });
};

export const getAllProjects = async () => {
  const userId = getUserId();
  const projectsQuery = query(
    collection(db, "projects"),
    where("userId", "==", userId)
  );
  const querySnapshot = await getDocs(projectsQuery);
  const result = await Promise.all(
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
  return result;
};

// Markups
export const postMarkup = async (projectId: string, markup: Markup) => {
  const markupsRef = collection(db, "projects", projectId, "markups");
  await addDoc(markupsRef, markup);
};
