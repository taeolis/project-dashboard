// src/context/ProjectContext.js
import React, { createContext, useState, useEffect } from "react";

// Create the context
export const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  // Initialize projects from localStorage (lazy init)
  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem("projects");
    return saved ? JSON.parse(saved) : [];
  });

  // Whenever projects change, save to localStorage
  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

  // CRUD for projects
  const addProject = (project) => {
    setProjects((prev) => [...prev, project]);
  };

  const updateProject = (updatedProject) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === updatedProject.id ? updatedProject : p))
    );
  };

  const deleteProject = (projectId) => {
    setProjects((prev) => prev.filter((p) => p.id !== projectId));
  };

  // Optional: tasks methods (if storing tasks within projects)
  const addTask = (projectId, task) => {
    setProjects((prev) =>
      prev.map((p) =>
        p.id === projectId ? { ...p, tasks: [...(p.tasks || []), task] } : p
      )
    );
  };

  const updateTask = (projectId, updatedTask) => {
    setProjects((prev) =>
      prev.map((p) =>
        p.id === projectId
          ? {
              ...p,
              tasks: p.tasks.map((t) =>
                t.id === updatedTask.id ? updatedTask : t
              ),
            }
          : p
      )
    );
  };

  const deleteTask = (projectId, taskId) => {
    setProjects((prev) =>
      prev.map((p) =>
        p.id === projectId
          ? {
              ...p,
              tasks: p.tasks.filter((t) => t.id !== taskId),
            }
          : p
      )
    );
  };

  return (
    <ProjectContext.Provider
      value={{
        projects,
        addProject,
        updateProject,
        deleteProject,
        addTask,
        updateTask,
        deleteTask,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
